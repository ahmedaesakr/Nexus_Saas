# Palette Journal

## 2024-03-10 - Screen Reader Support for Text-Ligature Icons
**Learning:** Text-ligature icons (like Google's Material Symbols, which use words like `menu` or `logout` to render shapes) are read aloud by screen readers as the text ligature itself if not hidden. This causes confusing announcements like "button, menu" or "button, close" where just the `aria-label` should suffice.
**Action:** Always add `aria-hidden="true"` to the `span` or `i` element containing the text ligature. Ensure the parent `<button>` has an explicit and descriptive `aria-label` and `focus-visible` styling for keyboard users.
