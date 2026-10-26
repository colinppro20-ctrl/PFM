// Inscription "next drop" (soldout.html) → client Shopify abonné au marketing par e-mail.
// Les identifiants Shopify restent ici, côté serveur (variables d'environnement Netlify),
// jamais dans le code public des pages.
//
// Variables d'environnement (Netlify > Project configuration > Environment variables) :
//   SHOPIFY_ADMIN_TOKEN                       token Admin API (shpat_...)            — OU —
//   SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET identifiants d'une app Dev Dashboard (client credentials)
// Scopes requis : read_customers, write_customers

const SHOP = process.env.SHOPIFY_SHOP || '0irdnx-yq.myshopify.com';
const API_VERSION = '2026-01';
const SOURCE = 'prayforme2002.com/soldout.html';
const TAG = 'newsletter-next-drop';
// ⚠️ Doit rester identique au texte affiché sous le champ e-mail de soldout.html
export const CONSENT_TEXT =
    'Sign up to receive new releases and upcoming drops from Pray For Me by email. You can unsubscribe at any time.';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- auth Shopify ---
let cachedToken = null; // { token, exp }

async function getToken() {
    if (process.env.SHOPIFY_ADMIN_TOKEN) return process.env.SHOPIFY_ADMIN_TOKEN;
    if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.token;
    if (!process.env.SHOPIFY_CLIENT_ID || !process.env.SHOPIFY_CLIENT_SECRET) {
        throw new Error('Identifiants Shopify manquants (SHOPIFY_ADMIN_TOKEN ou SHOPIFY_CLIENT_ID/SECRET)');
    }
    const res = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.SHOPIFY_CLIENT_ID,
            client_secret: process.env.SHOPIFY_CLIENT_SECRET
        })
    });
    if (!res.ok) throw new Error(`Token Shopify refusé (${res.status}) : ${await res.text()}`);
    const d = await res.json();
    cachedToken = { token: d.access_token, exp: Date.now() + (d.expires_in || 3600) * 1000 };
    return cachedToken.token;
}

async function admin(query, variables) {
    const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': await getToken() },
        body: JSON.stringify({ query, variables })
    });
    if (!res.ok) throw new Error(`Admin API HTTP ${res.status} : ${await res.text()}`);
    const json = await res.json();
    if (json.errors && json.errors.length) throw new Error('Admin API : ' + JSON.stringify(json.errors));
    return json.data;
}

function checkUserErrors(payload, name) {
    if (payload && payload.userErrors && payload.userErrors.length) {
        throw new Error(`${name} : ${JSON.stringify(payload.userErrors)}`);
    }
}

// --- logique d'inscription ---
export async function subscribe(email) {
    const now = new Date().toISOString();
    const consent = { marketingState: 'SUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN', consentUpdatedAt: now };

    // 1. Client existant ? (recherche exacte par e-mail → pas de doublon)
    const found = await admin(
        `query($email: String!) {
            customerByIdentifier(identifier: { emailAddress: $email }) {
                id
                defaultEmailAddress { marketingState }
            }
        }`,
        { email }
    );
    let customer = found.customerByIdentifier;
    let action;

    if (!customer) {
        // 2a. Nouveau client, créé directement avec son consentement marketing
        const d = await admin(
            `mutation($input: CustomerInput!) {
                customerCreate(input: $input) { customer { id } userErrors { field message } }
            }`,
            { input: { email, emailMarketingConsent: consent, tags: [TAG] } }
        );
        checkUserErrors(d.customerCreate, 'customerCreate');
        customer = d.customerCreate.customer;
        action = 'created';
    } else {
        // 2b. Client existant : nouvelle demande explicite → (ré)abonnement
        const state = customer.defaultEmailAddress && customer.defaultEmailAddress.marketingState;
        if (state !== 'SUBSCRIBED') {
            const d = await admin(
                `mutation($input: CustomerEmailMarketingConsentUpdateInput!) {
                    customerEmailMarketingConsentUpdate(input: $input) { customer { id } userErrors { field message } }
                }`,
                { input: { customerId: customer.id, emailMarketingConsent: consent } }
            );
            checkUserErrors(d.customerEmailMarketingConsentUpdate, 'customerEmailMarketingConsentUpdate');
            action = 'resubscribed';
        } else {
            action = 'already_subscribed';
        }
        const t = await admin(
            `mutation($id: ID!, $tags: [String!]!) { tagsAdd(id: $id, tags: $tags) { userErrors { field message } } }`,
            { id: customer.id, tags: [TAG] }
        );
        checkUserErrors(t.tagsAdd, 'tagsAdd');
    }

    // 3. Trace du consentement : date, source, texte présenté
    const m = await admin(
        `mutation($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) { userErrors { field message } }
        }`,
        {
            metafields: [{
                ownerId: customer.id,
                namespace: 'pfm',
                key: 'newsletter_consent',
                type: 'json',
                value: JSON.stringify({ date: now, source: SOURCE, text: CONSENT_TEXT })
            }]
        }
    );
    checkUserErrors(m.metafieldsSet, 'metafieldsSet');

    return { customerId: customer.id, action };
}

// --- endpoint Netlify : POST /api/subscribe { email, website } ---
export default async (req) => {
    if (req.method !== 'POST') return Response.json({ ok: false }, { status: 405 });

    let body;
    try { body = await req.json(); } catch (e) { return Response.json({ ok: false }, { status: 400 }); }

    // Pot de miel anti-robot : champ caché rempli → on fait semblant d'accepter
    if (body.website) return Response.json({ ok: true });

    const email = String(body.email || '').trim().toLowerCase();
    if (email.length > 254 || !EMAIL_RE.test(email)) {
        return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 });
    }

    try {
        const r = await subscribe(email);
        console.log(`[subscribe] ${r.action} ${r.customerId}`);
        return Response.json({ ok: true });
    } catch (err) {
        console.error('[subscribe] échec', err.message);
        return Response.json({ ok: false }, { status: 502 });
    }
};

export const config = { path: '/api/subscribe' };
