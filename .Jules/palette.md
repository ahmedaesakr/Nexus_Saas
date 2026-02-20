## 2026-02-20 - [Material Symbols Accessibility]
**Learning:** Text ligatures used by Google Material Symbols (e.g. "menu", "close") are read aloud by screen readers as plain text if not hidden, creating confusing auditory experiences.
**Action:** Always add `aria-hidden="true"` to `.material-symbols-outlined` spans and ensure interactive parent elements have explicit `aria-label` attributes.
