import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { readFile } from "node:fs/promises";
import path from "node:path";

const FONTS_DIR = path.join(process.cwd(), "src", "assets", "fonts");

type SatoriFont = {
	data: Buffer;
	name: string;
	style: "normal";
	weight: 400 | 700;
};

let fontsPromise: Promise<SatoriFont[]> | null = null;

async function loadFonts(): Promise<SatoriFont[]> {
	if (!fontsPromise) {
		fontsPromise = (async () => {
			const [regular, bold] = await Promise.all([
				readFile(path.join(FONTS_DIR, "geist-mono-latin-400-normal.woff")),
				readFile(path.join(FONTS_DIR, "geist-mono-latin-700-normal.woff")),
			]);
			return [
				{ data: regular, name: "GeistMono", style: "normal", weight: 400 },
				{ data: bold, name: "GeistMono", style: "normal", weight: 700 },
			];
		})();
	}
	return fontsPromise;
}

const BG = "#06060c";
const ACCENT = "#d4a055";
const BRIGHT = "#e8e8f0";
const DIM = "#555560";

/**
 * Generate a 1200×630 OG image in the site's terminal aesthetic.
 * Returns a PNG buffer.
 */
export async function generateOgImage(opts: {
	title: string;
	subtitle?: string;
}) {
	const fonts = await loadFonts();
	const lines = wrap(opts.title, 42);

	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					width: "100%",
					height: "100%",
					backgroundColor: BG,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "80px",
					fontFamily: "GeistMono",
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "8px",
								color: ACCENT,
								fontSize: "24px",
							},
							children: [
								{ type: "span", props: { children: "dz@portfolio" } },
								{ type: "span", props: { style: { color: DIM }, children: ":~/writing" } },
							],
						},
					},
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "12px",
							},
							children: [
								...lines.map((line: string, i: number) => ({
									type: "div",
									props: {
										style: {
											color: BRIGHT,
											fontSize: lines.length > 2 ? "48px" : "64px",
											fontWeight: 700,
											lineHeight: 1.15,
										},
										children: i === 0 ? `$ ${line}` : line,
									},
								})),
								...(opts.subtitle
									? [
											{
												type: "div",
												props: {
													style: { color: DIM, fontSize: "24px", marginTop: "8px" },
													children: opts.subtitle,
												},
											},
										]
									: []),
							],
						},
					},
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								justifyContent: "space-between",
								color: DIM,
								fontSize: "20px",
							},
							children: [
								{ type: "span", props: { children: "davidzheng.me" } },
								{
									type: "span",
									props: { style: { color: ACCENT }, children: "█" },
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts,
		},
	);

	const png = new Resvg(svg, {
		fitTo: { mode: "width", value: 1200 },
	}).render();

	return new Uint8Array(png.asPng());
}

/** Naive word-wrap for OG titles. */
function wrap(text: string, max: number): string[] {
	const words = text.split(/\s+/);
	const lines: string[] = [];
	let current = "";
	for (const word of words) {
		if (`${current} ${word}`.trim().length > max) {
			if (current) lines.push(current.trim());
			current = word;
		} else {
			current = `${current} ${word}`;
		}
	}
	if (current.trim()) lines.push(current.trim());
	return lines.slice(0, 4);
}
