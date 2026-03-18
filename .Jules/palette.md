## 2024-05-18 - Material Symbols Accessibility Pattern
**Learning:** Google Material Symbols Outlined uses text ligatures (e.g., `<span className="material-symbols-outlined">menu</span>`). Screen readers may read the literal ligature text ("menu") instead of the icon's intended meaning, especially in icon-only buttons.
**Action:** Always add `aria-hidden="true"` to the inner `span` containing the material symbol. Then, add a descriptive `aria-label` to the parent `<button>` or `<Link>` element to ensure correct screen reader announcements.
