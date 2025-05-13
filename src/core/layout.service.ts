import { Organization, LayoutType } from "../types"
import { renderGrid }      from '../layouts/grid.layout'
import { renderTimeline }  from '../layouts/timeline.layout'
import { renderLeaderboard } from '../layouts/leaderboard.layout'
import { renderColumn }    from '../layouts/column.layout'
import { throwDeprecation } from "process"

const layoutMap: Record<LayoutType, (orgs: Organization[]) => string> = {
    grid: renderGrid,
    timeline: renderTimeline,
    leaderboard: renderLeaderboard,
    column: renderColumn,
}

export function renderSVG(orgs: Organization[], layout: LayoutType): string {
    const renderer = layoutMap[layout]
    if (!renderer) {
        throw new error('unknow_layout')
    }
    return renderer(orgs)
}