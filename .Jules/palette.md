## 2024-07-25 - Material Symbols Accessibility
**Learning:** Google Material Symbols Outlined uses text ligatures (e.g. `menu`, `close`) to render icons. Screen readers will literally read these out loud (e.g. "menu", "close", "logout") which can be confusing or redundant, especially inside buttons that lack `aria-label`s.
**Action:** Always add `aria-hidden="true"` to `material-symbols-outlined` elements, and ensure their parent interactive elements (like `<button>`) have proper `aria-label`s.
