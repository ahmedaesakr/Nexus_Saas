
## 2024-03-15 - [Added ARIA Labels to Sidebar Icon Buttons]
**Learning:** Found that icon-only buttons in the main navigation (Sidebar) were missing both ARIA labels and focus states, which are critical for keyboard and screen reader accessibility. Also, Google Material Symbols Outlined icons used within these buttons require `aria-hidden="true"` so screen readers don't announce the ligature text (e.g. "menu", "close", "logout").
**Action:** Applied ARIA attributes (`aria-label`, `aria-hidden`, `aria-controls`, `aria-expanded`) and standardized focus states using existing Tailwind classes (`focus-visible:ring-2 focus-visible:ring-primary focus:outline-none`) to all icon-only buttons in `Sidebar.tsx`. Will apply this pattern to all future icon-only buttons encountered.
