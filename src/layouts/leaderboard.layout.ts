import { Organization } from '../types'

export function renderLeaderboard(orgs: Organization[]): string {
  const svgWidth = 520
  const svgHeight = 160
  const startY = 40
  const gapY = 40
  const barFactor = 3.2

  const rows = orgs
    .map((org, i) => {
      const y = startY + i * gapY
      const barWidth = Math.round(org.contributions / barFactor)
      return `
      <text class="text" x="20" y="${y}">${org.name}</text>
      <rect class="bar-bg" x="140" y="${y - 12}" width="320" height="10" rx="5"/>
      <rect class="bar-fg" x="140" y="${y - 12}" width="${barWidth}" height="10" rx="5"/>
      <text class="text" x="470" y="${y}">${org.contributions}</text>`
    })
    .join('')

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
  <style>
    .bg      { fill: #0d1117; }
    .bar-bg  { fill: #30363d; }
    .bar-fg  { fill: #58a6ff; }
    .text    { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="12"/>
  ${rows}
</svg>`
}