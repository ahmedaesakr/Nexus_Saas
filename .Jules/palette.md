## 2026-03-08 - [Initial UX Review]
**Learning:** The Sidebar component has several icon-only buttons (mobile menu, mobile close, logout) lacking `aria-label` attributes and properly hidden `aria-hidden='true'` icons for screen readers.
**Action:** Add `aria-label` attributes to these icon-only buttons, set `aria-hidden='true'` on their inner icons, and ensure they have keyboard focus states.
