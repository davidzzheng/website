// Type declarations for the WICG HTML-in-Canvas API (drawElementImage)
// Spec: https://github.com/WICG/html-in-canvas
// Currently available behind chrome://flags/#canvas-draw-element

interface CanvasRenderingContext2D {
  drawElementImage: (
    element: Element,
    x?: number,
    y?: number,
  ) => DOMMatrix | undefined;
}

interface HTMLCanvasElement {
  requestPaint?: () => void;
  onpaint?: ((this: HTMLCanvasElement, ev: Event) => unknown) | null;
}
