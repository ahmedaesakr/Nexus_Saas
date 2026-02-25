## 2026-02-16 - [UX/Accessibility Improvements]
**Learning:** Material Symbols (icon font) expose raw text like "refresh" or "play_circle" to screen readers.
**Action:** Always add `aria-hidden="true"` to `span.material-symbols-outlined`.

**Learning:** Refresh actions on dashboards were using `<a>` tags causing full page reloads.
**Action:** Use `RefreshButton` pattern: `useRouter().refresh()` inside `useTransition` for smooth, non-blocking updates with loading feedback.
