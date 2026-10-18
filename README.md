# Fresh Phones PH workflow discussion

A standalone presentation website for discussing the Fresh Phones PH prototype, the supplied client workflow, the changes required for alignment, and the expected outcomes.

The deck contains 24 slides in five chapters. Existing prototype capabilities, documented client rules, proposed additions, open decisions, and expected outcomes have distinct labels. It does not modify or connect to the operational Fresh Phones PH application.

## Open the presentation

[View the presentation on GitHub Pages](https://justinebacurin1927.github.io/freshphonesph-workflow-discussion/).

The presentation and this repository are public. No ChatGPT sign-in is required. Changes pushed to `main` run the checks and publish `dist/` through `.github/workflows/pages.yml`.

## Design and prototype views

The presentation uses the supplied palette: deep teal `#042329`, teal `#005850`, green `#008C5E`, and mint `#7CC490`. Sora headings and DM Sans body text are served from local font files, with their SIL Open Font License notices retained. Bold emphasis highlights the important rules, responsibilities, and decisions.

The prototype slide includes both desktop and mobile previews. Overview, Support, and Documents switch both captures; the screen-size controls select desktop, mobile, or both. Click a capture to inspect its full interface in an enlarged view.

## Run locally

Requires Node.js 20 or newer. No package installation or API credentials are needed.

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. Set `PORT` to use a different local port.

```sh
npm run check
```

## Present

- Use the arrow keys, Previous and Next buttons, or a horizontal swipe to navigate.
- Press **O** for the contents, **N** for presenter notes, and **F** for presentation mode.
- Presentation mode fills the screen. Move the pointer to the top or bottom, tap on a touch screen, or press Tab to reveal controls; they hide after a short pause. Press **Esc** or **F** to exit.
- Use Home and End to jump to the first and last slides.
- Copy a slide link to share its exact position.
- Print the complete deck using the header's print button; choose landscape PDF if your browser does not honor the page settings.

The Decision log stores answers in the current browser only. Export notes as Markdown to share or retain them. Browser-local notes are not uploaded to the site or GitHub, synchronized between devices, or treated as signed client acceptance. The site's `noindex` metadata is an indexing preference; the GitHub Pages presentation remains publicly accessible.

## Edit content

| File | Purpose |
| --- | --- |
| `dist/slides.js` | Slide content, source references, presenter notes, and discussion prompts |
| `dist/app.js` | Slide rendering, navigation, workflow inspection, decision log, and export |
| `dist/styles.css` | Responsive layout, presentation mode, and all-slide print styling |
| `dist/assets/` | Favicon and existing synthetic-account prototype captures |
| `scripts/serve.mjs` | Dependency-free local static server |
| `.github/workflows/pages.yml` | Check and publish `dist/` to GitHub Pages on pushes to `main` |
| `.openai/hosting.json` | Retained identity for the earlier private Sites preview |

Any static host can serve `dist/`. Relative assets and hash-based slide links support the GitHub Pages project subdirectory. The GitHub Pages workflow is the current publication path; the earlier private Sites preview is no longer the discussion link.

## Sources and boundaries

Prepared from the supplied `Fresh_Phones_PH_Basic_Website_Workflow.docx` and `Fresh_Phones_PH_Organizational_Structure_V4.pdf`, plus the local `freshphonesph-main-run` code and project documentation inspected on 18 October 2026. The original client documents and application source are not copied into this repository.

Mobile screenshots are earlier captures from `docs/uat/customer-mobile-walkthrough-2026-09-27.md` in the prototype repository. That walkthrough identifies them as synthetic-account evidence. Desktop screenshots show the actual local portal components rendered in October 2026 with isolated illustrative API responses, captured at 1600×1000. No production data or live financial transactions were used. Both capture sources are labeled in the deck; neither establishes business acceptance or backend verification.

Proposed states, role mappings, scope expansions, acceptance scenarios, and implementation phases require client confirmation. The presentation makes no new price, delivery-date, production-readiness, or measured-benefit commitment.
