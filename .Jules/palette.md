## 2025-02-27 - Material Symbols Accessibility Pattern
**Learning:** The project uses `Material Symbols Outlined` via Google Fonts, which render as text ligatures (e.g., "menu", "close"). Screen readers announce this text by default, which can be confusing or redundant.
**Action:** Always add `aria-hidden="true"` to `material-symbols-outlined` spans. Interactive parent elements (buttons/links) must have explicit `aria-label` attributes if they lack visible text labels.
