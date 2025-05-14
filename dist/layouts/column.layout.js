"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderColumn = renderColumn;
function renderColumn(orgs) {
    const svgWidth = 320;
    const rowHeight = 60;
    const padding = 20;
    const svgHeight = padding * 2 + orgs.length * rowHeight;
    const rows = orgs
        .map((org, i) => {
        const y = padding + i * rowHeight;
        return `
      <image
        href="${org.logoUrl}"
        x="20"
        y="${y}"
        width="36"
        height="36"
        clip-path="circle(18px at 38px ${y + 18}px)"
      />
      <text
        x="70"
        y="${y + 20}"
        fill="#c9d1d9"
        font="13px 'Segoe UI', sans-serif"
      >${org.name}</text>
      <text
        x="70"
        y="${y + 36}"
        fill="#7ee787"
        font="12px 'Segoe UI', sans-serif"
      >${org.contributions} contribs</text>`;
    })
        .join('');
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
  <style>
    .bg { fill: #0d1117; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="12"/>
  ${rows}
</svg>`;
}
