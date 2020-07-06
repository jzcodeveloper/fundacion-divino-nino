import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_DOCTYPES_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_DOCTYPES_SUCCESS:
        draft.doctypes = payload;
        draft.loading = false;
        draft.error = null;
        break;

      case types.FETCH_DOCTYPES_FAILURE:
        draft.loading = false;
        draft.error = payload;
        break;

      default:
        return draft;
    }
  });
