import { Organization } from '../types'

export function renderGrid(orgs: Organization[]): string {
  const cardWidth = 180
  const cardHeight = 160
  const padding = 20
  const svgWidth = padding + orgs.length * cardWidth + padding * (orgs.length - 1)
  const svgHeight = cardHeight + padding * 2

  const cards = orgs
    .map((org, i) => {
      const x = padding + i * (cardWidth + padding)
      return `
      <g transform="translate(${x}, ${padding})">
        <rect
          x="0" y="0"
          width="${cardWidth}" height="${cardHeight}"
          rx="10" fill="#161b22" stroke="#30363d"
        />
        <image
          href="${org.logoUrl}"
          x="${cardWidth / 2 - 22}"
          y="16"
          width="44" height="44"
          clip-path="circle(22px at ${cardWidth / 2}px 38px)"
        />
        <text
          x="${cardWidth / 2}" y="80"
          text-anchor="middle"
          fill="#c9d1d9"
          font="bold 14px 'Segoe UI', sans-serif"
        >${org.name}</text>
        <text
          x="${cardWidth / 2}" y="104"
          text-anchor="middle"
          fill="#7ee787"
          font="12px 'Segoe UI', sans-serif"
        >${org.contributions} contribs</text>
      </g>`
    })
    .join('')

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
  <style>
    .bg { fill: #0d1117; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="12" />
  ${cards}
</svg>`
}
