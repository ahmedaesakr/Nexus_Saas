## 2024-03-20 - [ARIA Hidden on Material Icons]
**Learning:** The project uses Google Material Symbols Outlined (text ligatures) for icons. These icons are read out loud by screen readers by their text content (e.g. "menu", "close", "logout"), which is confusing. They must be hidden from screen readers using `aria-hidden="true"`, with parent buttons requiring explicit `aria-label` attributes.
**Action:** Always add `aria-hidden="true"` to `<span className="material-symbols-outlined">...</span>` and ensure the parent interactive element has a clear `aria-label`.
