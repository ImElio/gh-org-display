export interface Organization {
    // Name Org
    name: string
    // Role user in the org
    // Owner, Admin, Member
    role: string
    // Number of contrib
    contributions: number
    // URL logo/avatar of the org
    logoUrl: string
}

// Allowed Layout
export type LayoutType = 'grid' | 'timeline' | 'leaderboard' | 'column'

// Error Codes
export type ErrorCode =
  | 'missing_username'
  | 'user_not_found'
  | 'no_orgs_public'
  | 'rate_limited' // *
  | 'internal_error' // *
  | 'no_contributions'
  | 'org_not_found'
  | 'unknown_layout'
 