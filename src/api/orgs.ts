import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchOrganizations } from '../core/github.service'
import { renderSVG } from '../core/layout.service'
import { renderError } from '../core/error.service'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const username = req.query.username as string
    const layout = (req.query.layout as string) || 'grid'

    if (!username) {
        res.setHeader('Content-Type', 'image/svg+xml')
        return res.status(400).send(renderError('missing_username'))
    }

    try {
        const orgs = await fetchOrganizations(username)
        if (orgs.length === 0) {
            res.setHeader('Content-Type', 'image/svg+xml')
            return res.status(200).send(renderError('no_orgs_public'))
        }

        const svg = renderSVG(orgs, layout as any)
        res.setHeader('Content-Type', 'image/svg+xml')
        res.setHeader('Cache-Control', 'no-cache')
        return res.status(200).send(svg)
        
  } catch (error: any) {
    res.setHeader('Content-Type', 'image/svg+xml')

    switch (error.message) {
      case 'User not found':
        return res.status(404).send(renderError('user_not_found'))
      case 'Rate limited':
        return res.status(429).send(renderError('rate_limited'))
      default:
        return res.status(500).send(renderError('internal_error'))
    }
  }
}