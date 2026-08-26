---
name: Nusantara Bright
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#3d4850'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#6d7881'
  outline-variant: '#bdc8d2'
  surface-tint: '#00658d'
  primary: '#00658d'
  on-primary: '#ffffff'
  primary-container: '#00baff'
  on-primary-container: '#004764'
  inverse-primary: '#81cfff'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#994700'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff9249'
  on-tertiary-container: '#6d3000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6e7ff'
  primary-fixed-dim: '#81cfff'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6b'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb68b'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#753400'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style
The design system focuses on transparency, accessibility, and the vibrant clarity of the Indonesian archipelago. It targets a broad demographic—from researchers to everyday citizens—requiring a UI that feels as reliable as a government utility but as approachable as a modern consumer app.

The style is **Modern Professional with a Soft Minimalist touch**. It leverages heavy whitespace and a bright, airy color palette to make complex data sets feel digestible. The emotional response should be one of "effortless intelligence"—the user feels empowered by data rather than overwhelmed by it. High-contrast text and crisp geometry ensure legibility across all environments.

## Colors
The palette is inspired by the Indonesian sky and sun. 

- **Primary (Sky Blue):** Used for primary actions, active states, and brand identification. It represents clarity and the open horizon of data.
- **Secondary (Sun Gold):** Used for highlights, warnings (BMKG alerts), and data visualization accents.
- **Tertiary (Deep Orange):** Reserved for high-priority alerts (Earthquakes/Critical rate changes).
- **Neutral:** A deep slate-black is used for typography to ensure AAA accessibility. 
- **Surface:** The background is a very light "Cloud Gray" (#F8FAFC) to reduce eye strain, while cards and interactive elements sit on "Pure White" (#FFFFFF) to create subtle depth.

## Typography
This design system uses **Plus Jakarta Sans** for all levels. Its Indonesian roots and modern, friendly geometric forms align perfectly with the brand's identity.

- **Headlines:** Use a tighter letter spacing and bold weights to ground the data-heavy pages.
- **Body:** Standardized at 16px for optimal readability of statistics and reports.
- **Labels:** Used for the ID/EN language toggle and metadata (e.g., "Last updated: BMKG").
- **Contrast:** Always use the Neutral color (#1A1C1E) for text on white surfaces to maintain a professional, high-contrast look.

## Layout & Spacing
The design system employs a **Fluid-Fixed Hybrid Grid**. 

- **Desktop:** 12-column grid with a maximum container width of 1200px. Centered on page.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing follows an 8px rhythmic scale. Chat bubbles and data cards should use `md` (24px) padding to ensure content "breathes," reflecting the open, casual brand personality. The top navigation bar, housing the logo and language toggle, is fixed at the top with a subtle blur background.

## Elevation & Depth
To maintain a "simple yet professional" feel, depth is achieved through **Tonal Layering and Soft Ambient Shadows**.

- **Level 0 (Background):** #F8FAFC.
- **Level 1 (Cards/Chat Input):** White surface with a very soft, highly diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)).
- **Level 2 (Popovers/Toggles):** White surface with a more defined shadow (0px 8px 30px rgba(0, 0, 0, 0.08)).

Avoid harsh borders. Instead, use a 1px solid border in a slightly darker gray (#E2E8F0) only when elements need to be differentiated on a white background.

## Shapes
The shape language is **Rounded and Friendly**. 

Standard elements like cards, input fields, and chat bubbles use a 0.5rem (8px) radius. Larger layout sections or "Hero" cards may use 1rem (16px). This approachability offsets the "dryness" of statistical data, making the assistant feel like a helpful companion rather than a rigid database.

## Components
- **Chat Bubbles:** User bubbles are Primary Sky Blue with white text. Assistant bubbles are White with a Level 1 shadow and Neutral text.
- **Language Toggle:** A pill-shaped segmented control using the Primary Sky Blue for the active state indicator.
- **Data Cards:** Used for BMKG or BI stats. These should feature a 1px border (#E2E8F0), 24px internal padding, and the Secondary Sun Gold for accent icons.
- **Buttons:** 
  - *Primary:* Filled Sky Blue, Bold white text, 8px corners.
  - *Secondary:* Ghost style with Sky Blue outline and text.
- **Input Fields:** Large, 48px height minimum for mobile-friendliness, using a 1px #E2E8F0 border that turns Primary Sky Blue on focus.
- **Alert Chips:** For earthquake data, use a "High-Contrast" chip with Tertiary Orange background and white text.