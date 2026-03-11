
## 2024-03-20 - Accessible Icon-Only Buttons
**Learning:** This app heavily relies on Google Material Symbols Outlined (text ligatures) for icons within components like the Sidebar. Without `aria-hidden="true"`, screen readers attempt to read the ligature text (e.g., "menu", "logout"), which provides poor context, especially if the button lacks an explicit `aria-label`.
**Action:** Always add `aria-hidden="true"` to ligature-based icons in interactive elements. Ensure parent buttons have descriptive `aria-label` attributes and keyboard focus states (e.g., `focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`) for proper accessibility and keyboard navigation visibility.
