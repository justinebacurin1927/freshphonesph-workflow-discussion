# Fresh Phones PH workflow discussion

A 24-page [Open Slide](https://github.com/open-slide/open-slide) presentation covering the existing prototype, supplied client workflow, required alignment work, and expected outcomes. Five chapters retain the original content, provenance, and discussion prompts.

[Open the public presentation](https://justinebacurin1927.github.io/freshphonesph-workflow-discussion/).

## Run locally

Use Node.js 24 (minimum 22.12):

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173/s/workflow-discussion`. The root opens Open Slide's deck browser during development.

```sh
npm run check
npm run build
npm run preview
```

The production root opens the deck directly. Add `?browser=1` to open the deck browser. `@open-slide/core` is pinned to **2.2.0**, matching the repository cloned to `/home/jaycee/Projects/open-slide` for reference; this workspace installs the published runtime so CI and other machines do not depend on that local checkout.

## Present and discuss

Use Open Slide's toolbar for fullscreen presentation, slide overview, presenter notes, the separate presenter window, and exports (HTML, PDF, PowerPoint). Use the displayed keyboard shortcuts or arrow keys to navigate. The framework scales each 1920×1080 page to fit the display; other aspect ratios have space around the canvas.

The prototype page includes Overview, Support, and Documents tabs; Desktop, Mobile, and Both controls; and enlarged captures. The payment workflow has five selectable stages. The Discussion and Next Steps pages open the decision log and export its Markdown notes.

Decision notes remain in the current browser, using the same storage key as the earlier presentation. Export a copy before changing devices. They are not synchronized, uploaded, or treated as signed client acceptance. The public site's `noindex` metadata is an indexing preference.

## Edit

| File | Purpose |
| --- | --- |
| `slides/workflow-discussion/index.tsx` | React pages, aligned speaker notes, interactions, metadata, and design tokens |
| `slides/workflow-discussion/assets/content.json` | Preserved slide content, five chapters, ten decisions, and bold emphasis |
| `slides/workflow-discussion/assets/deck.css` | Scoped canvas layouts and local fonts |
| `slides/workflow-discussion/assets/` | Original desktop/mobile captures, favicon, fonts, and font licenses |
| `open-slide.config.ts` | Runtime, local port, and deployment base |
| `scripts/prepare-pages.mjs` | Public metadata, direct slide/presenter routes, and legacy slide-link compatibility |
| `.github/workflows/pages.yml` | Check, build, and deploy to GitHub Pages |

Read the runtime's `skills/slide-authoring/SKILL.md` before editing. `dist/` is generated; edit the source and rebuild. The dev runtime includes inspector comments and design controls. This project does not modify the framework clone.

## Publish

Changes pushed to `main` install the lockfile, check the deck, and build with `OPEN_SLIDE_BASE=/freshphonesph-workflow-discussion/` before publishing `dist/`. The source and presentation are public and require no ChatGPT sign-in. Direct links such as `s/workflow-discussion?p=10` and the presenter route work on reload. Earlier root links such as `#payments` still open the corresponding page.

The earlier private Sites preview identity is retained in `.openai/hosting.json`; GitHub Pages remains the publication path.

## Sources

Prepared from `Fresh_Phones_PH_Basic_Website_Workflow.docx`, `Fresh_Phones_PH_Organizational_Structure_V4.pdf`, and local `freshphonesph-main-run` code/documentation inspected on 18 October 2026. Original client documents and application source are not copied here.

Desktop captures show the actual October 2026 portal components with isolated illustrative API data. Mobile captures are the recorded 27 September 2026 synthetic-account evidence. Both remain labeled and do not establish business acceptance or backend verification.

The approved teal/green palette (`#042329`, `#005850`, `#008C5E`, `#7CC490`), Sora headings, and DM Sans body text are retained, including SIL Open Font License notices. Proposed states, role mappings, scope expansions, acceptance scenarios, and delivery phases require client confirmation. The deck makes no new price, delivery-date, production-readiness, or measured-benefit commitment.
