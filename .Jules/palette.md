## 2026-02-16 - Accessible Font Icons
**Learning:** Material Symbols Outlined icons (using text ligatures) are read by screen readers as literal text (e.g., "dataset", "menu") if not hidden. This can be confusing, especially when the icon text doesn't match the visible label or is decorative.
**Action:** Always add `aria-hidden="true"` to `<span class="material-symbols-outlined">` elements. Ensure the parent interactive element (button/link) has a descriptive `aria-label` or visible text content.
