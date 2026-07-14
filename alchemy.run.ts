import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Effect from "effect/Effect"

export default Alchemy.Stack(
  "dz",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* run() {
    const site = yield* Cloudflare.Website.StaticSite("Website", {
      assets: {
        notFoundHandling: "404-page",
      },
      command: "bun run build",
      compatibility: {
        flags: ["nodejs_compat"],
      },
      outdir: "dist",
    })

    return { url: site.url }
  })
)
