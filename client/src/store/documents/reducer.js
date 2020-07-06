import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_DOCUMENTS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_DOCUMENTS_SUCCESS: {
        const { model, data } = payload;
        if (draft.documents[model] === undefined) {
          draft.documents[model] = { limit: 20, sort: "updated_at desc" };
        }
        draft.documents[model].results = data.results;
        draft.loading = false;
        draft.error = null;
        break;
      }

      case types.FETCH_DOCUMENTS_FAILURE:
        draft.loading = false;
        draft.error = null;
        break;

      case types.SET_LIST_LIMIT: {
        const { model, limit } = payload;
        draft.documents[model].limit = limit;
        break;
      }

      case types.SET_LIST_SORT: {
        const { model, sort } = payload;
        draft.documents[model].sort = sort;
        break;
      }

      case types.RESET_DOCUMENTS: {
        const { model } = payload;
        draft.documents[model].results = [];
        break;
      }

      default:
        return draft;
    }
  });
