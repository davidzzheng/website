import type { APIRoute } from "astro";
import { generateOgImage } from "@/lib/og";

export const GET: APIRoute = async () => {
	const png = await generateOgImage({
		title: "david zheng",
		subtitle: "fullstack developer — graphics, design systems, software craft",
	});
	return new Response(png, {
		headers: { "Content-Type": "image/png" },
	});
};
