import type { OpenSlideConfig } from "@open-slide/core";

export default {
	base: process.env.OPEN_SLIDE_BASE ?? "/",
	port: 4173,
	build: { showSlideBrowser: true, showSlideUi: true, allowHtmlDownload: true },
} satisfies OpenSlideConfig;
