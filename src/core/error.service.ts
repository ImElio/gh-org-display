
import { ErrorCode } from '../types'

const errorMap: Record<ErrorCode, () => string> = {
  missing_username: () => `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="100">
  <style>
    .bg { fill: #0d1117; }
    .title { fill: #f85149; font: bold 16px 'Segoe UI', sans-serif; }
    .body { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="title" x="20" y="35">❌ Missing required parameter: 'username'</text>
  <text class="body"  x="20" y="60">Please provide a username in the query string.</text>
</svg>
  `,
  user_not_found: () => `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="100">
  <style>
    .bg { fill: #0d1117; }
    .title { fill: #f85149; font: bold 16px 'Segoe UI', sans-serif; }
    .body { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="title" x="20" y="35">🙅 GitHub user not found</text>
  <text class="body"  x="20" y="60">We could not find the specified GitHub user.</text>
</svg>
  `,
  no_orgs_public: () => `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="100">
  <style>
    .bg { fill: #0d1117; }
    .title { fill: #f85149; font: bold 16px 'Segoe UI', sans-serif; }
    .body { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="title" x="20" y="35">🔐 No visible organizations found</text>
  <text class="body"  x="20" y="60">This may happen if all orgs are private or hidden.</text>
</svg>
  `,
  rate_limited: () => `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="100">
  <style>
    .bg { fill: #0d1117; }
    .title { fill: #f85149; font: bold 16px 'Segoe UI', sans-serif; }
    .body { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="title" x="20" y="35">🚫 GitHub API rate limit exceeded</text>
  <text class="body"  x="20" y="60">Try again later or provide a token to increase the limit.</text>
</svg>
  `,
  no_contributions: () => `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="100">
  <style>
    .bg { fill: #0d1117; }
    .title { fill: #f85149; font: bold 16px 'Segoe UI', sans-serif; }
    .body { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="title" x="20" y="35">📭 No contribution data found</text>
  <text class="body"  x="20" y="60">This user has not contributed to any organizations.</text>
</svg>
  `,
  org_not_found: () => `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="100">
  <style>
    .bg { fill: #0d1117; }
    .title { fill: #f85149; font: bold 16px 'Segoe UI', sans-serif; }
    .body { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="title" x="20" y="35">🏢 Organization not found</text>
  <text class="body"  x="20" y="60">The specified organization does not exist or is inaccessible.</text>
</svg>
  `,
  unknown_layout: () => `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="100">
  <style>
    .bg { fill: #0d1117; }
    .title { fill: #f85149; font: bold 16px 'Segoe UI', sans-serif; }
    .body { fill: #c9d1d9; font: 13px 'Segoe UI', sans-serif; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="10"/>
  <text class="title" x="20" y="35">🎨 Unknown layout specified</text>
  <text class="body"  x="20" y="60">The layout parameter provided is not supported.</text>
</svg>
  `,
}

export function renderError(code: ErrorCode): string {
  return (errorMap[code] || errorMap.internal_error)()
}
