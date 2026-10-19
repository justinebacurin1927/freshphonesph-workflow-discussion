import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import assert from "node:assert/strict";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const assetRoot = path.join(root, "slides/workflow-discussion/assets");
const { slides, chapters, decisions } = JSON.parse(
	await readFile(path.join(assetRoot, "content.json"), "utf8"),
);
const unique = (items, label) =>
	assert.equal(new Set(items).size, items.length, `${label} must be unique`);
assert.equal(slides.length, 24);
assert.equal(chapters.length, 5);
assert.equal(decisions.length, 10);
unique(
	slides.map((slide) => slide.id),
	"Slide IDs",
);
unique(
	decisions.map((decision) => decision.id),
	"Decision IDs",
);
const chapterIDs = new Set(chapters.map((chapter) => chapter.id));
for (const slide of slides) {
	assert(chapterIDs.has(slide.chapter), `Unknown chapter on ${slide.id}`);
	for (const key of [
		"id",
		"type",
		"title",
		"summary",
		"notes",
		"source",
		"status",
	])
		assert(slide[key], `Missing ${key} on ${slide.id}`);
	for (const [, asset] of [
		...(slide.images ?? []),
		...(slide.desktopImages ?? []),
	])
		await access(path.join(assetRoot, asset.replace(/^assets\//, "")));
}
for (const font of [
	"Sora-Variable.ttf",
	"DMSans-Variable.ttf",
	"Sora-OFL.txt",
	"DMSans-OFL.txt",
])
	await access(path.join(assetRoot, "fonts", font));
const source = await readFile(
	path.join(root, "slides/workflow-discussion/index.tsx"),
	"utf8",
);
const pages = [
	...source.matchAll(/<DeckPage slide=\{slides\[(\d+)\]\} number=\{(\d+)\}/g),
];
assert.equal(
	pages.length,
	slides.length,
	"Every source slide must have an Open Slide page",
);
for (const [index, match] of pages.entries()) {
	assert.equal(
		Number(match[1]),
		index,
		"Page order must preserve the content order",
	);
	assert.equal(
		Number(match[2]),
		index + 1,
		"Page numbers must match source order",
	);
}
const syntax = ts.createSourceFile("index.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const noteExport = syntax.statements.filter(ts.isVariableStatement).flatMap(statement => [...statement.declarationList.declarations]).find(declaration => declaration.name.getText(syntax) === "notes");
assert(noteExport?.initializer && ts.isArrayLiteralExpression(noteExport.initializer), "Speaker notes must use an editable array literal");
assert.equal(noteExport.initializer.elements.length, slides.length, "Every page must have a speaker note");
assert(noteExport.initializer.elements.every(note => ts.isStringLiteralLike(note) && note.text.trim()), "Speaker notes must contain text");
assert(
	source.includes("freshphonesph-workflow-decisions-v1"),
	"Existing browser decisions must remain accessible",
);
console.log(
	`Checked ${slides.length} Open Slide pages, ${chapters.length} chapters, ${decisions.length} discussion prompts, presenter notes, captures, and font licenses.`,
);
