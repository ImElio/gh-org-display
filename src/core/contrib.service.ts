import fetch from 'node-fetch'

const GITHUB_API_BASE = "https://api.github.com"
const TOKEN = process.env.GITHUB_TOKEN

/**
 * Count user contributions (commits, PRs, issues) in a given organization
 */
export async function countContributions(
    username: string,
    org: string
): Promise<number> {
    const query = `author:${username} org:${org}`
    const url = `${GITHUB_API_BASE}/search/commits?q=${encodeURIComponent(
        query
    )}`
    const headers: Record<string, string> = {
        Accept: `application/vnd.github.cloak-preview`,
        'User-Agent': 'gh-org-display',
    }
    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`

  const res = await fetch(url, { headers })
  if (!res.ok) return 0
  const data = await res.json()
  return data.total_count ?? 0
}