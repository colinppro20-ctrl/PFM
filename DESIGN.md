# Design System Document: Ultra-High-End Editorial

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Curator"**

This design system is engineered to move away from the "app-like" density of standard real estate platforms and toward the rarefied air of a high-end luxury lifestyle publication. We are not building a database of houses; we are curating an immersive cinematic experience of architectural masterpieces. 

The aesthetic is driven by **Atmospheric Minimalism**. By utilizing deep, obsidian-toned surfaces and high-contrast editorial typography, we create a "darkroom" effect where the property photography—the true hero—feels backlit and luminous. The layout rejects the rigid, centered grid in favor of **Intentional Asymmetry**, using expansive whitespace (or rather, "blackspace") to allow elements to breathe with the confidence of a premium brand.

---

## 2. Colors & Tonal Depth

Our palette is built on a foundation of "Near-Blacks" and "Warm Charcoals," punctuated by sophisticated muted golds and soft purples that evoke dusk in a high-end villa.

### The Palette (Material Convention)
*   **Background:** `#121413` (The deep, obsidian canvas)
*   **Primary (Accents/CTAs):** `#d8bde8` (A muted, sophisticated lavender-gold hybrid)
*   **Secondary:** `#e9bac9` (Soft bronze/rose undertones for supporting elements)
*   **Surface Hierarchy:**
    *   `surface-container-lowest`: `#0d0e0e` (Deepest wells)
    *   `surface`: `#121413` (Standard canvas)
    *   `surface-container-high`: `#292a29` (Elevated modules)

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. 
In high-end design, lines are "clutter." Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a property detail module (`surface-container-low`) should sit on the main `background` without a stroke, creating a clean, monolithic look.

### The "Glass & Gradient" Rule
To elevate beyond flat UI, use Glassmorphism for floating navigation and detail overlays. Apply `surface-variant` with a 60% opacity and a `20px` backdrop-blur. 
*   **Signature Textures:** For primary CTAs, use a subtle linear gradient from `primary` to `primary-container` at a 135-degree angle. This provides a tactile "glow" reminiscent of high-end lighting fixtures.

---

## 3. Typography
The typography scale is designed to mimic a luxury magazine (e.g., Vogue or Architectural Digest).

*   **Display & Headlines (Noto Serif):** These are our "Art Elements." Use `display-lg` for property titles with tight letter-spacing (-2%). The serif font conveys heritage, authority, and elegance.
*   **Body & Titles (Inter):** Clean, Swiss-inspired minimalism. The sans-serif provides a functional counterpoint to the decorative serif. Use `body-lg` for descriptions with generous line-height (1.6) to ensure the text feels "expensive" and readable.
*   **Labels (Inter):** All-caps with increased letter-spacing (+10%) for metadata like "SQUARE FOOTAGE" or "LOCATION."

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional shadows. Depth in this design system is achieved through **Tonal Layering**, mimicking the way light hits physical surfaces.

*   **The Layering Principle:** Stack surfaces from darkest to lightest to move toward the user. 
    *   *Base:* `background` (#121413)
    *   *Section:* `surface-container-low` (#1b1c1b)
    *   *Card/Modal:* `surface-container-high` (#292a29)
*   **Ambient Shadows:** If a floating element (like a gallery lightbox) requires a shadow, use a large blur (40px-60px) with only 5% opacity, tinted with the `primary` color to simulate an atmospheric glow rather than a harsh drop shadow.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons (The "Jewelry" of the UI)
*   **Primary:** High-contrast `primary` fill with `on-primary` text. No rounded corners (use `none` or `sm` from the scale) to maintain a sharp, architectural edge.
*   **Tertiary:** Text-only with a 1px `primary` underline that expands on hover.

### Cards & Property Teasers
*   **Constraint:** Forbid the use of divider lines.
*   **Structure:** Use vertical white space (64px+) from the spacing scale to separate property blocks. Imagery should be "Full Bleed" or "Offset" to break the grid.
*   **Glass Overlays:** Property names should appear on a `surface-container` glass chip in the bottom-left of the image.

### Input Fields
*   Minimalist "Bottom-Line Only" inputs. The line uses `outline-variant` at 30% opacity. Upon focus, the line transitions to `primary` with a subtle glow.

### Additional Signature Components
*   **The Immersive Scroller:** A full-screen vertical scroll component where images fade in/out using a parallax effect, with typography "floating" over the imagery.
*   **The "Curator" Cursor:** A custom circular cursor (24px, `primary` color at 20% opacity) that expands when hovering over interactive property elements.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts. Place text on the left and imagery slightly offset to the right to create an editorial flow.
*   **Do** prioritize high-resolution imagery with a consistent "warm/dark" filter to match the UI.
*   **Do** use "Breathing Room." If you think there is enough space between sections, double it.

### Don't
*   **Don't** use 100% opaque white text. Use `on-surface-variant` (`#cdc4cd`) for body text to reduce eye strain and maintain the cinematic tone.
*   **Don't** use standard "Rounded" buttons. This system is architectural; sharp corners (`none`) or very minimal radii (`sm`) feel more premium.
*   **Don't** use icons for everything. In luxury, words (typography) are often more elegant than a generic icon.