import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const { slides } = JSON.parse(
	await readFile(
		path.join(root, "slides/workflow-discussion/assets/content.json"),
		"utf8",
	),
);
const base = process.env.OPEN_SLIDE_BASE ?? "/";
if (!base.startsWith("/") || !base.endsWith("/"))
	throw new Error("OPEN_SLIDE_BASE must start and end with /.");
const canonical =
	"https://justinebacurin1927.github.io/freshphonesph-workflow-discussion/";
const logoFile = (await readdir(path.join(root, "dist/assets"))).find(file => /^fresh-phones-logo-[\w-]+\.png$/.test(file));
if (!logoFile) throw new Error("The built Fresh Phones PH logo is missing.");
const bootstrap = `<script>
  (() => {
    const base = ${JSON.stringify(base)};
    const route = base + 's/workflow-discussion';
    const ids = ${JSON.stringify(slides.map((slide) => slide.id))};
    if ((location.pathname === base || location.pathname === base + 'index.html') && !new URLSearchParams(location.search).has('browser')) {
      const page = Math.max(0, ids.indexOf(location.hash.slice(1))) + 1;
      history.replaceState(null, '', route + '?p=' + page);
    }
  })();
</script>`;
let html = await readFile(path.join(root, "dist/index.html"), "utf8");
html = html.replace(
	"<title>open-slide</title>",
	"<title>Fresh Phones PH — Workflow alignment</title>",
);
html = html.replace(/<link rel="icon"[^>]+>/g, "");
html = html.replace(
	"<head>",
	`<head>
  <meta name="description" content="Fresh Phones PH prototype, client workflow, implementation changes, and expected outcomes.">
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#042329">
  <meta property="og:title" content="Fresh Phones PH — Workflow alignment">
  <meta property="og:url" content="${canonical}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${base}assets/${logoFile}" type="image/png">
  ${bootstrap}`,
);
await writeFile(path.join(root, "dist/index.html"), html);
await writeFile(path.join(root, "dist/404.html"), html);
await writeFile(path.join(root, "dist/.nojekyll"), "");
for (const route of [
	"s/workflow-discussion",
	"s/workflow-discussion/presenter",
]) {
	const directory = path.join(root, "dist", route);
	await mkdir(directory, { recursive: true });
	await writeFile(path.join(directory, "index.html"), html);
}
console.log(
	`Prepared GitHub Pages routes under ${base}; retained ${slides.length} legacy slide links.`,
);
