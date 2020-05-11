import { types } from "./types";

// Fetch global stats
export const fetchGlobalStatsRequest = () => ({
  type: types.FETCH_GLOBAL_STATS_REQUEST,
});

export const fetchGlobalStatsSuccess = (global) => ({
  type: types.FETCH_GLOBAL_STATS_SUCCESS,
  payload: global,
});

export const fetchGlobalStatsFailure = (error) => ({
  type: types.FETCH_GLOBAL_STATS_FAILURE,
  payload: error,
});

// Toggle sidebar
export const toggleSidebarRequest = () => ({
  type: types.TOGGLE_SIDEBAR_REQUEST,
});

// Toggle sidebar item
export const toggleSidebarItemRequest = (index) => ({
  type: types.TOGGLE_SIDEBAR_ITEM_REQUEST,
  payload: index,
});
