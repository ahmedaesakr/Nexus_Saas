## 2024-05-24 - Material Symbols Accessibility
**Learning:** `material-symbols-outlined` icons render as ligatures (text) and are announced by screen readers if not hidden with `aria-hidden="true"`.
**Action:** Always add `aria-hidden="true"` to icon spans when using Material Symbols, and ensure parent buttons have explicit `aria-label`.
