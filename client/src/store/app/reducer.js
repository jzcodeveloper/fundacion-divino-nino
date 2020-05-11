import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";
export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_GLOBAL_STATS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_GLOBAL_STATS_SUCCESS:
        draft.global = payload;
        draft.error = null;
        draft.loading = false;
        break;

      case types.FETCH_GLOBAL_STATS_FAILURE:
        draft.error = payload;
        draft.loading = false;
        break;

      case types.TOGGLE_SIDEBAR_REQUEST:
        draft.sidebar.collapsed = !draft.sidebar.collapsed;
        break;

      case types.TOGGLE_SIDEBAR_ITEM_REQUEST:
        const exists = draft.sidebar.items[payload];
        if (exists === undefined) draft.sidebar.items[payload] = true;
        else draft.sidebar.items[payload] = !exists;
        break;

      default:
        return draft;
    }
  });
