/**
 * Escape XML special chars to safely embed text in SVG
 */
export function escapeXml(text: string): string {
  return text.replace(/[&<>'"]/g, (c) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&apos;',
      '"': '&quot;',
    } as Record<string, string>)[c]
  )
}

/**
 * Render a progress bar given current and max values
 */
export function renderBar(
  x: number,
  y: number,
  current: number,
  max: number,
  height = 6
): string {
  const width = Math.round((current / max) * max)
  return `
    <rect x="${x}" y="${y}" width="${max}" height="${height}" rx="3" fill="#30363d"/>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="3" fill="#58a6ff"/>
  `
}
