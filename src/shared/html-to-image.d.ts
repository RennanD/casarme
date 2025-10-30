declare module 'html-to-image' {
  export function toJpeg(node: HTMLElement, options?: { quality?: number; pixelRatio?: number }): Promise<string>
  export function toPng(node: HTMLElement, options?: { pixelRatio?: number }): Promise<string>
}


