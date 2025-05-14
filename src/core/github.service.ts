import fetch from 'node-fetch'
import { Organization } from '../types'
import { countContributions } from './contrib.service'

const GITHUB_API_BASE = 'https://api.github.com'
const TOKEN = process.env.GITHUB_TOKEN

/**
 * Fetches public organizations for a given GitHub user and maps to Organization[].
 * Throws if user not found or rate limited.
 */
export async function fetchOrganizations(username: string) {
    const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/orgs`
    const headers: Record<string, string> = {
        'User-Agent': 'gh-org-display',
        Accept: 'application/vnd.github.v3+json',
    }
    if (TOKEN) {
        headers.Authorization = `Bearer ${TOKEN}`
    }

    const res = await fetch(url, { headers })

    if (res.status === 404) {
        throw new Error('User not found')
    }
    
    if (res.status === 403) {
        throw new Error('Rate limited')
    }
    if (!res.ok) {
        throw new Error('Internal Error')
    }


    const data = await res.json()
    return data.map((org: any) => ({
        name: org.login,
        // role: 'Member',
        contributions: 0, // TODO: Calcolate the real contributions for org
        logoUrl: org.avatar_url 
    }))

  const json = await res.json()
  // count contributions in parallel
  const orgs: Organization[] = await Promise.all(
    json.map(async (org: any) => ({
      name: org.login,
      contributions: await countContributions(username, org.login),
      logoUrl: org.avatar_url,
    }))
  )
  return orgs
}