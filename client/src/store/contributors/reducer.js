import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_CONTRIBUTORS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_CONTRIBUTORS_SUCCESS:
        draft.contributors.total = payload.total;
        draft.contributors.results[payload.page] = payload.results;
        draft.error = null;
        draft.loading = false;
        break;

      case types.FETCH_CONTRIBUTORS_FAILURE:
        draft.error = payload;
        draft.loading = true;
        break;

      default:
        return draft;
    }
  });
