---
name: Obsidian Sentinel
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#007650'
  on-tertiary-container: '#76ffc2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system establishes a high-precision, mission-critical workspace tailored for security researchers, DevSecOps engineers, and software architects. The visual language balances surgical technical efficiency with understated modern polish. It borrows the density and keyboard-first utility of Linear and GitHub while incorporating the situational clarity and diagnostic authority of Datadog and Snyk.

The aesthetic philosophy is **Technical Minimalism with Tonal Depth**:
- **Information Density over Decorative Space:** Compact row heights, scannable data layouts, and immediate visual hierarchy allow security analysts to triage hundreds of alerts without fatigue.
- **Calibrated Restraint:** Vibrant color is deployed strictly as semantic signal (vulnerabilities, scanning statuses, diff annotations, AI interventions). Non-semantic chrome remains neutral, deep, and receded.
- **Micro-tactile Precision:** High-contrast sub-pixel hair lines (1px inner highlights), muted dark slate layering, and subtle interactive states replace heavy neon glows and playful consumer motifs.
- **Trust & Telemetry:** Every element reinforces absolute structural integrity. Data is grounded, legible, and deterministic.

## Colors

The color palette is built exclusively for a dark-first execution. The structural foundation relies on a cold, deep midnight baseline layered with slate containers, punctuated by a focused violet system for generative actions and an uncompromising 5-tier semantic security spectrum.

### Surface System
- **Canvas Base (`#0B0F19`):** Root viewport background, immersive and non-reflective.
- **Surface Level 1 (`#0E1526`):** Lateral rails, table outer containers, page section blocks.
- **Surface Level 2 (`#161F33`):** Interactive cards, code block containers, drawer panels.
- **Surface Level 3 (`#1E293B`):** Flyouts, tooltips, nested card compartments, active list items.
- **Surface Level 4 (`#24324D`):** Hover states for high-level controls, secondary button idle states.

### Accent & Platform Identity
- **Primary Violet (`#7C3AED`):** Primary actions, focal active states, active tab border indicators.
- **Electric Violet (`#8B5CF6`):** Interactive hover states for primary triggers and focus halos.
- **AI Assist Violet (`#A78BFA`):** Dedicated to AI-generated remediation badges, automated patch diffs, and prompt highlights.
- **Secondary Cyan (`#38BDF8`):** Informational links, telemetry indicators, pipeline steps.

### Semantic Vulnerability & Status Matrix
- **Critical Severity:** Crimson Accent (`#EF4444`), Light Text (`#F87171`), Deep Well Background (`#450A0A` at 60% opacity with `#7F1D1D` 1px border).
- **High Severity:** Amber Flame (`#F59E0B`), Light Text (`#FBBF24`), Deep Well Background (`#451A03` at 60% opacity with `#78350F` 1px border).
- **Medium Severity:** Sand Gold (`#EAB308`), Light Text (`#FEF08A`), Deep Well Background (`#422006` at 40% opacity with `#854D0E` 1px border).
- **Low / Info:** Ice Cyan (`#38BDF8`), Muted Cyan (`#0284C7`), Surface Layer (`#082F49` at 40% opacity with `#0369A1` 1px border).
- **Secure / Clean / Pass:** Emerald Shield (`#10B981`), Light Mint (`#34D399`), Deep Shield Background (`#064E3B` at 50% opacity with `#047857` 1px border).

### Borders & Dividing Strokes
- **Subtle Partition:** `rgba(255, 255, 255, 0.06)` for internal row and card dividers.
- **Structural Border:** `#1E293B` or `rgba(255, 255, 255, 0.10)` for interactive component edges.
- **Active Edge Highlight:** `rgba(255, 255, 255, 0.16)` on card tops (1px inset box shadow) to simulate physical edge lighting.

## Typography

The typography architecture uses a dual-engine hierarchy: **Inter** handles interface navigation, executive summaries, narrative reporting, and descriptive metadata; **JetBrains Mono** provides unyielding structural clarity for code representation, SHA commits, file paths, CWE classifications, and raw security telemetry.

### Type Scale Rules
- **Numerical Telemetry:** All metrics (vulnerability counts, scan runtimes, CVSS scores) use tabular figures (`font-variant-numeric: tabular-nums`) to prevent layout shifts during live scans.
- **Monospace Encasement:** Any entity representing machine-executable logic, memory addresses, CVE identifiers (e.g., `CVE-2024-3094`), or CLI parameters must use `code-sm` or `code-md` accompanied by an inline token background (`#161F33`).
- **Uppercase Badges:** Security ratings and severity indicators use `label-mono` with uppercase transformation and `letter-spacing: 0.05em`.

## Layout & Spacing

The layout model is anchored by a responsive fluid grid optimized for high-density analytical dashboards and expansive code diff inspections:

### Grid Architecture
- **Desktop (1440px+):** Fixed 64px collapsible icon rail + 240px secondary contextual workspace sidebar + fluid 12-column content grid (`gutter-lg: 1.5rem`, `margin-lg: 2rem`). Content max-width constrained to `1760px` to maintain lateral line-length control during unified diff audits.
- **Tablet / Small Desktop (1024px – 1439px):** Sidebar collapses to an off-canvas drawer or compact rail. 8-column fluid grid (`gutter: 1rem`, `margin-md: 1.5rem`).
- **Mobile (< 1024px):** Single-column stacked triage stream with persistent utility navigation bar (`gutter: 0.75rem`, `margin: 1rem`). Complex diff split-views automatically refactor into stacked/unified inline mode.

### Layout Densities
- **Compact View (Data Tables & Tree Views):** Component vertical padding uses `space-xs` (4px) to `space-sm` (8px). Row heights lock at 36px for high triage velocity.
- **Default View (Dashboards & Settings):** Standard component padding uses `space-md` (12px) to `space-base` (16px).

## Elevation & Depth

This design system deliberately rejects heavy diffuse box-shadows and generic drop blurs, using **Tonal Layering with Inset Structural Highlights** to maintain a crisp, surgical look:

### Elevation Planes
- **Ground Floor (Z0 - `#0B0F19`):** Canvas backdrop.
- **Level 1 (Z1 - `#0E1526`):** Structural panels and sidebars. Separated by `border-right: 1px solid rgba(255, 255, 255, 0.07)`. No shadow.
- **Level 2 (Z2 - `#161F33`):** Resting cards, findings lists, metric modules. Rendered with:
  - `border: 1px solid rgba(255, 255, 255, 0.08)`
  - `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` (Simulating physical top-edge bevel).
- **Level 3 (Z3 - `#1E293B`):** Hovered cards, active drawer surfaces, command palettes.
  - `border: 1px solid rgba(255, 255, 255, 0.14)`
  - `box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`
- **Level 4 (Overlay / Z4 - `#1E293B`):** Modal dialogs, CVE triage popovers, floating menus.
  - `border: 1px solid rgba(124, 58, 237, 0.3)` (Violet-tinted structural perimeter).
  - `box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)`
  - Backdrop filter: `backdrop-filter: blur(8px); background-color: rgba(11, 15, 25, 0.8)`.

## Shapes

The design system employs **Level 2 (Rounded)** shape parameters. Primary functional cards utilize rounded-xl treatments (`1.5rem` or `24px` for structural dashboard shells, downscaled to `0.75rem` / `12px` for inner component cards) to soften intense tabular layouts without feeling toy-like.

- **Primary Outer Containers & Metric Panels:** `rounded-xl` (`12px` to `16px`).
- **Interactive Controls (Buttons, Inputs, Selects):** `rounded-md` (`6px` to `8px`) for immediate button affordance.
- **Security Pills, Severities, Status Tags:** Full capsule (`9999px`) or tight radius (`4px`) depending on density:
  - Severity Badges: `rounded` (`4px`) with monospaced text to emphasize structural tag alignment.
  - User Status & Branch Badges: Pill-shaped (`9999px`).
- **Code Blocks & Diff Containers:** `rounded-lg` (`8px`) with hard `0px` internal corners adjacent to gutter line numbers.

## Components

### Buttons
- **Primary Action (Scan, Remediate):** Solid violet (`#7C3AED`), text `#FFFFFF`, border `1px solid #8B5CF6`. Hover: `#8B5CF6`. Active: `#6D28D9`. Inset highlight `inset 0 1px 0 rgba(255, 255, 255, 0.2)`. Focus: `0 0 0 2px #0B0F19, 0 0 0 4px #7C3AED`.
- **Secondary (Inspect, Filter):** Background `#161F33`, text `#F1F5F9`, border `1px solid rgba(255, 255, 255, 0.1)`. Hover: `#1E293B`, border `rgba(255, 255, 255, 0.18)`.
- **Destructive (Revoke, Ignore Finding):** Background `#450A0A`, text `#F87171`, border `1px solid #7F1D1D`. Hover: `#7F1D1D`, text `#FEF2F2`.

### Severity Badges & Status Pills
- Formatted as `display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; font-family: JetBrains Mono; font-size: 11px; font-weight: 600; text-transform: uppercase`.
- **Critical:** Background `rgba(69, 10, 10, 0.6)`, text `#F87171`, border `1px solid #EF4444`. Includes a `6px` pulsating crimson status dot.
- **High:** Background `rgba(69, 26, 3, 0.6)`, text `#FBBF24`, border `1px solid #F59E0B`.
- **Medium:** Background `rgba(66, 32, 6, 0.5)`, text `#FEF08A`, border `1px solid #EAB308`.
- **Low:** Background `rgba(8, 47, 73, 0.5)`, text `#38BDF8`, border `1px solid #0284C7`.
- **Pass / Secure:** Background `rgba(6, 78, 59, 0.5)`, text `#34D399`, border `1px solid #10B981`.

### Code Diff Viewer (Vulnerable vs. AI Remediated)
- Split or unified viewport wrapped in `#0E1526` with `1px solid rgba(255, 255, 255, 0.08)`.
- **Gutter Column:** Monospace line numbers in `#64748B`, right-aligned, background `#0B0F19`, width `48px`, user-select none.
- **Removed / Vulnerable Line:** Background `rgba(239, 68, 68, 0.12)`, left border `3px solid #EF4444`, text `#FECACA`. Monospaced text with inline marker `-`.
- **Added / AI Secure Line:** Background `rgba(16, 185, 129, 0.12)`, left border `3px solid #10B981`, text `#A7F3D0`. Monospaced text with inline marker `+`.
- **AI Suggested Patch Badge:** Inline tag with `#7C3AED` background, `#FFFFFF` text, label `"AI AUTO-FIX AVAILABLE"`.

### Data Tables (Vulnerability Backlog)
- Outer border `1px solid #1E293B`, rounded-xl container.
- Table Header: Background `#0E1526`, text `#94A3B8`, font-size `12px`, letter-spacing `0.05em`, border-bottom `1px solid #1E293B`.
- Table Rows: Background `#111827`, alternate row `#0E1526` (optional for dense mode), hover state `#161F33`. Height `40px` (dense) or `52px` (standard). Border bottom `1px solid rgba(255, 255, 255, 0.04)`.
- Columns: Checkbox, Severity Badge, Vulnerability Title + CWE ID, File Path (`JetBrains Mono`), Introduced By, Age, Action Button.

### Inputs & Search Bars
- Background `#0E1526`, border `1px solid #1E293B`, text `#F8FAFC`, placeholder `#475569`.
- Height: 36px (standard), 44px (global omnibar search).
- Focus: Border `#7C3AED`, outline none, box-shadow `0 0 0 1px #7C3AED, 0 0 12px rgba(124, 58, 237, 0.25)`.
- Global Query Bar: Prefixed with monospaced search syntax operator chips (e.g., `repo:`, `is:open`, `severity:critical`).

### Metric Cards
- Surface `#161F33`, border `1px solid rgba(255, 255, 255, 0.08)`, border-radius `12px`, padding `1.25rem`.
- Layout: Top line contains uppercase muted section label (`#94A3B8`, font-size `12px`) + optional semantic status icon.
- Central Metric: `headline-xl` (`36px`) tabular font.
- Bottom Context: Differential badge (e.g., `+12% vs last build`) using Green (`#34D399`) for reduction of vulnerabilities, Crimson (`#F87171`) for newly introduced CVEs.

### Scan Progress Bar
- Track: Height `6px`, background `#1E293B`, border-radius `9999px`, overflow hidden.
- Active Fill: Violet-to-Cyan linear gradient (`linear-gradient(90deg, #7C3AED 0%, #38BDF8 100%)`).
- Animated Indeterminate State: Subtle moving highlight scan-line sweeping across the bar using a high-velocity keyframe gradient.