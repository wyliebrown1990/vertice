/** Workflow canvas grid geometry (shared by the canvas and builder overlays). */
export const COL = 244
export const ROW = 112
export const NODE_W = 184
export const NODE_H = 72
export const PAD = 24

/** Pixel position of a grid cell (for overlays such as an insertion slot). */
export const cellPos = (x: number, y: number) => ({ left: PAD + x * COL, top: PAD + y * ROW, width: NODE_W, height: NODE_H })
