## 2024-05-24 - Material Symbols Accessibility

**Learning:** Material Symbols Outlined icons are implemented as text ligatures (e.g., `<span>menu</span>`), which screen readers announce as the text content ("menu") rather than treating as an icon. This creates a confusing experience when used inside buttons that might already have labels, or when the icon name doesn't match the button's function.

**Action:** Always add `aria-hidden="true"` to `span.material-symbols-outlined` elements to hide the ligature text from screen readers. Ensure the parent interactive element (button, link) has a descriptive `aria-label` if it doesn't have visible text content.
