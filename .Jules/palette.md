## 2026-02-17 - Material Symbols Accessibility
**Learning:** The application uses Google Material Symbols Outlined font ligatures for icons (e.g., `<span class="material-symbols-outlined">refresh</span>`). Without `aria-hidden="true"`, screen readers announce the ligature text (e.g., "refresh"), which is confusing.
**Action:** Always add `aria-hidden="true"` to any decorative icon using this pattern. Ensure the parent interactive element has an explicit `aria-label`.

## 2026-02-17 - Soft Refresh Pattern
**Learning:** Using `router.refresh()` inside `useTransition` allows for data re-fetching without a full page reload, preserving client state (like scroll position) and allowing for custom loading indicators via `isPending`.
**Action:** Replace `<a>` tag refresh buttons with client components using this pattern for better dashboard UX.
