import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_DATASET_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_DATASET_SUCCESS:
        draft.dataset = payload;
        draft.error = null;
        draft.loading = false;
        break;

      case types.FETCH_DATASET_FAILURE:
        draft.dataset = null;
        draft.error = payload;
        draft.loading = false;
        break;

      case types.RESET_DATASET_REQUEST:
        draft.dataset = null;
        draft.error = null;
        draft.loading = true;
        break;

      default:
        return draft;
    }
  });
