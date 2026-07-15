/**
 * Shader-lab CRT postprocessing on the particle background only.
 * Page content stays as normal HTML — fully readable, no shader degradation.
 * CSS overlays (scanlines + vignette) provide CRT atmosphere on text.
 */
import * as THREE from "three/webgpu"
import { texture as tslTexture, uv as tslUv, vec2, float as tslFloat } from "three/tsl"
import { ShaderLabPostProcessingSource, type ShaderLabConfig } from "@basementstudio/shader-lab"

let active = false
let failed = false
let outputCanvas: HTMLCanvasElement | null = null
let rafId = 0
let cleanup: (() => void) | null = null

const crtConfig: ShaderLabConfig = {
  layers: [{
    id: "crt", name: "CRT", type: "crt", kind: "effect",
    blendMode: "normal", compositeMode: "filter",
    hue: 0, opacity: 0.5, saturation: 1, visible: true,
    params: {
      crtMode: "slot-mask", cellSize: 3,
      scanlineIntensity: 0.1, maskIntensity: 0.4,
      barrelDistortion: 0.1, chromaticAberration: 0.5,
      beamFocus: 0.6, brightness: 1.0,
      vignetteIntensity: 0.25, flickerIntensity: 0.01,
    },
  }],
  timeline: { duration: 999, loop: true, tracks: [] },
}

const flipUv = vec2(tslUv().x, tslFloat(1).sub(tslUv().y))

export function isShaderSupported(): boolean {
  return typeof HTMLElement !== "undefined"
}

export async function enableShader() {
  if (active || failed) return
  active = true

  const heroCanvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null
  if (!heroCanvas) { active = false; return }

  const w = innerWidth
  const h = innerHeight

  // Output canvas behind page content, in front of hero-canvas
  outputCanvas = document.createElement("canvas")
  outputCanvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;"
  outputCanvas.width = w
  outputCanvas.height = h
  document.body.appendChild(outputCanvas)

  // Hide raw hero-canvas behind output
  heroCanvas.style.zIndex = "-2"

  const renderer = new THREE.WebGPURenderer({ canvas: outputCanvas, antialias: false, alpha: true })
  await renderer.init()
  renderer.setSize(w, h)
  renderer.setClearColor(0x000000, 0)

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const particleTexture = new THREE.CanvasTexture(heroCanvas)
  particleTexture.colorSpace = THREE.SRGBColorSpace

  // Capture scene: particle texture → inputTarget
  const captureScene = new THREE.Scene()
  const captureMat = new THREE.MeshBasicNodeMaterial()
  captureMat.transparent = true
  captureMat.colorNode = tslTexture(particleTexture, flipUv)
  captureScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), captureMat))

  // Display scene: CRT output → screen
  const displayScene = new THREE.Scene()
  const displayMat = new THREE.MeshBasicNodeMaterial()
  displayMat.transparent = true
  displayMat.colorNode = tslTexture(particleTexture, flipUv)
  displayScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMat))

  const inputTarget = new THREE.WebGLRenderTarget(w, h)
  const postSource = new ShaderLabPostProcessingSource(crtConfig, { renderer, width: w, height: h })
  try {
    await postSource.initialize()
    console.log("[shader] CRT on particles, ready:", postSource.ready)
  } catch (e) {
    console.error("[shader] init failed:", e)
    failed = true; active = false; return
  }

  const t0 = performance.now()

  function render() {
    if (!active) return
    rafId = requestAnimationFrame(render)

    particleTexture.needsUpdate = true

    // Particles → inputTarget
    renderer.setRenderTarget(inputTarget)
    renderer.render(captureScene, camera)

    // CRT postprocessing
    if (postSource.ready) {
      const time = (performance.now() - t0) * 0.001
      const output = postSource.update(inputTarget.texture, time, 0.016)
      if (output) {
        displayMat.colorNode = tslTexture(output, tslUv())
        displayMat.needsUpdate = true
      }
    }

    // CRT output → screen
    renderer.setRenderTarget(null)
    renderer.render(displayScene, camera)
  }

  rafId = requestAnimationFrame(render)

  const onResize = () => {
    const nw = innerWidth, nh = innerHeight
    if (outputCanvas) { outputCanvas.width = nw; outputCanvas.height = nh }
    renderer.setSize(nw, nh)
    inputTarget.setSize(nw, nh)
    postSource.resize(nw, nh)
  }
  window.addEventListener("resize", onResize)

  cleanup = () => {
    heroCanvas.style.zIndex = ""
    window.removeEventListener("resize", onResize)
    postSource.dispose()
    renderer.dispose()
    inputTarget.dispose()
    particleTexture.dispose()
  }
}

export function disableShader() {
  active = false
  cancelAnimationFrame(rafId)
  cleanup?.()
  cleanup = null
  if (outputCanvas) { outputCanvas.remove(); outputCanvas = null }
}
