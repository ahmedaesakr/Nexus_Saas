## 2026-02-16 - Accessibility for Material Symbols
**Learning:** Material Symbols Outlined icons use text ligatures (e.g., "menu", "close"), which screen readers will announce as literal text unless hidden. This can be confusing (e.g., hearing "dataset Nexus Flow" instead of just "Nexus Flow").
**Action:** Always add `aria-hidden="true"` to `material-symbols-outlined` spans. Ensure the parent interactive element (button, link) has an explicit `aria-label` or visible text content that describes the action.
