# Fresh Phones PH workflow discussion

This is an Open Slide presentation workspace, separate from the operational Fresh Phones PH application.

- Read `.agents/skills/slide-authoring/SKILL.md` before editing a deck. `npm run sync:skills` refreshes the built-in guides from the pinned runtime.
- The deck entry is `slides/workflow-discussion/index.tsx`; content and local captures/fonts live in its `assets/` directory.
- Keep all 24 source slides, source provenance, and distinctions between implemented, documented, proposed, and unresolved behavior. Preserve the source order and aligned speaker notes.
- Preserve the approved palette (`#042329`, `#005850`, `#008C5E`, `#7CC490`), local Sora/DM Sans fonts, desktop/mobile previews, and browser-local decision capture/export.
- Decisions use `freshphonesph-workflow-decisions-v1`. Do not change this key or upload discussion notes.
- Design for the fixed 1920×1080 canvas. Scope deck styles with `fp-`; do not alter the framework's global layout or package internals.
- Run `npm run check` and `npm run build`. Check the built Pages base path, direct slide/presenter URLs, and legacy `#slide-id` links when changing routing or deployment.
- `dist/` is generated and ignored. GitHub Actions builds and publishes it when source changes reach `main`.
