# Palette's Journal - Critical Learnings

This journal records critical UX and accessibility insights for the Nexus Flow application.

## 2024-05-23 - Initial Observation
**Learning:** The application lacks loading states for critical async actions (Save, Invite), leading to uncertainty.
**Action:** Implement loading indicators on primary action buttons using `lucide-react`'s `Loader2` component and `animate-spin` utility.
