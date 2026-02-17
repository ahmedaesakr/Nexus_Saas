## 2024-05-23 - Material Symbols Accessibility
**Learning:** This app uses `material-symbols-outlined` text ligatures for icons (e.g., `<span class="material-symbols-outlined">menu</span>`). Screen readers may read the ligature text ("menu") which can be confusing or redundant if not handled.
**Action:** When using `material-symbols-outlined`:
1. If the icon is decorative (accompanied by text), add `aria-hidden="true"` to the `span`.
2. If the icon is a standalone button, add `aria-label` to the button and `aria-hidden="true"` to the icon `span` to ensure the screen reader announces the action, not the icon name.
