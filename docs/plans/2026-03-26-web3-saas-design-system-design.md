# Nexus Flow Web3 SaaS Design System

## Goal
Create one cohesive full-app visual system for Nexus Flow with a premium SaaS structure and restrained Web3 styling: matte black foundations, neon green as the primary signal, dark glass surfaces, and consistent edge glow for focus and activation states.

## Direction
- Style: Clean Web3 SaaS
- Surface treatment: Glass + edge glow
- Core behavior: controlled motion, strong hierarchy, minimal color noise

## Design System
- Base palette: `#050505`, `#090B09`, `#101510`, `#141914`
- Primary accent: `#8CFF4B`
- Supporting accent: soft mint/cool green, only for atmospheric gradients
- Text: off-white primary, gray-green secondary, muted olive tertiary
- Surfaces: dark translucent cards with subtle blur and luminous green borders on hover/focus
- Borders: 1px soft green-white mix, stronger on active/high-value modules
- Shadows: black depth first, glow second

## Typography
- Display/headings: `Outfit`
- Body/data/UI: `Plus Jakarta Sans`
- Tone: precise, technical, premium, product-first

## Component Rules
- Primary buttons use neon green fill with dark ink text
- Secondary buttons use dark glass with green border/focus progression
- Inputs use one shared dark-glass treatment with consistent focus glow
- Cards, tables, sidebars, modals, and panels all inherit the same glass-dark surface family
- Navigation uses black surfaces with active neon emphasis, never rainbow or blue-led accents

## Screen Mapping
- Landing: bold hero, cleaner messaging, green atmospheric glows, premium CTA structure
- Auth: split-screen product pitch with dark glass testimonial and consistent form controls
- Dashboard shell: unified sidebar, background, cards, charts, and top-level actions
- Workflows/settings/product pages: inherit green token system through existing `primary` usage and shared surfaces

## Motion
- Default motion remains fast and restrained
- Lift, glow, shimmer, and reveal are only used to improve orientation or focus
- Reduced motion is respected globally

## Delivery Scope
1. Replace old cyan/blue token system with neon-green Web3 SaaS tokens
2. Standardize brand naming to Nexus Flow in visible shell/metadata
3. Refactor shared shell components and primary surfaces
4. Apply the system to landing, auth, dashboard, and core product pages that define the experience
