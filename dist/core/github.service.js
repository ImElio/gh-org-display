"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOrganizations = fetchOrganizations;
const node_fetch_1 = __importDefault(require("node-fetch"));
const GITHUB_API_BASE = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;
/**
 * Fetches public organizations for a given GitHub user and maps to Organization[].
 * Throws if user not found or rate limited.
 */
async function fetchOrganizations(username) {
    const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/orgs`;
    const headers = {
        'User-Agent': 'gh-org-display',
        Accept: 'application/vnd.github.v3+json',
    };
    if (TOKEN) {
        headers.Authorization = `Bearer ${TOKEN}`;
    }
    const res = await (0, node_fetch_1.default)(url, { headers });
    if (res.status === 404) {
        throw new Error('User not found');
    }
    if (res.status === 403) {
        throw new Error('Rate limited');
    }
    if (!res.ok) {
        throw new Error('Internal Error');
    }
    const data = await res.json();
    return data.map((org) => ({
        name: org.login,
        // role: 'Member',
        contributions: 0, // TODO: Calcolate the real contributions for org
        logoUrl: org.avatar_url
    }));
}
