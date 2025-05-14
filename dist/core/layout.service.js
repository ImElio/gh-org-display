"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSVG = renderSVG;
const grid_layout_1 = require("../layouts/grid.layout");
const timeline_layout_1 = require("../layouts/timeline.layout");
const leaderboard_layout_1 = require("../layouts/leaderboard.layout");
const column_layout_1 = require("../layouts/column.layout");
const layoutMap = {
    grid: grid_layout_1.renderGrid,
    timeline: timeline_layout_1.renderTimeline,
    leaderboard: leaderboard_layout_1.renderLeaderboard,
    column: column_layout_1.renderColumn,
};
function renderSVG(orgs, layout) {
    const renderer = layoutMap[layout];
    if (!renderer) {
        throw new Error('unknow_layout');
    }
    return renderer(orgs);
}
