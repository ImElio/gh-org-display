"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const github_service_1 = require("../core/github.service");
const layout_service_1 = require("../core/layout.service");
const error_service_1 = require("../core/error.service");
async function handler(req, res) {
    const username = req.query.username;
    const layout = req.query.layout || 'grid';
    if (!username) {
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.status(400).send((0, error_service_1.renderError)('missing_username'));
    }
    try {
        const orgs = await (0, github_service_1.fetchOrganizations)(username);
        if (orgs.length === 0) {
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.status(200).send((0, error_service_1.renderError)('no_orgs_public'));
        }
        const svg = (0, layout_service_1.renderSVG)(orgs, layout);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'no-cache');
        return res.status(200).send(svg);
    }
    catch (error) {
        res.setHeader('Content-Type', 'image/svg+xml');
        switch (error.message) {
            case 'User not found':
                return res.status(404).send((0, error_service_1.renderError)('user_not_found'));
            case 'Rate limited':
                return res.status(429).send((0, error_service_1.renderError)('rate_limited'));
            default:
                return res.status(500).send((0, error_service_1.renderError)('internal_error'));
        }
    }
}
