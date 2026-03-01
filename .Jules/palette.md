## 2026-03-01 - Added ARIA attributes to Sidebar icons
**Learning:** Icon-only buttons using Google Material Symbols Outlined (text ligatures) require special attention. Screen readers will read the ligature text (e.g. 'menu', 'close', 'logout') which is confusing or redundant.
**Action:** Always add `aria-hidden='true'` to the `<span className='material-symbols-outlined'>` elements and ensure the parent button has a descriptive `aria-label` attribute.
