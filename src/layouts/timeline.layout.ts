import { Organization } from '../types'

export function renderTimeline(orgs: Organization[]): string {
  const svgWidth = 420
  const svgHeight = 220
  const startY = 40
  const gapY = 60
  const barFactor = 3.2

  const rows = orgs
    .map((org, i) => {
      const y = startY + i * gapY
      const barWidth = Math.round(org.contributions / barFactor)
      return `
      <circle class="dot" cx="40" cy="${y}" r="6"/>
      <text class="text" x="60" y="${y - 6}">${org.name}</text>
      <text class="text" x="60" y="${y + 12}">${org.contributions} contribs</text>
      <rect fill="#58a6ff" x="60" y="${y + 20}" width="${barWidth}" height="6" rx="3"/>`
    })
    .join('')

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
  <style>
    .bg   { fill: #0d1117; }
    .line { stroke: #30363d; stroke-width: 2; }
    .dot  { fill: #58a6ff; }
    .text { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="12"/>
  <line class="line" x1="40" y1="40" x2="40" y2="180"/>
  ${rows}
</svg>`
}
