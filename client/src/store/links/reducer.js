import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_LINK_DOCUMENTS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_LINK_DOCUMENTS_SUCCESS:
        draft.loading = false;
        draft.error = null;
        break;

      case types.FETCH_LINK_DOCUMENTS_FAILURE:
        draft.loading = false;
        draft.error = payload;
        break;

      case types.CREATE_LINK_DOCUMENT_DATA: {
        const { model } = payload.params;
        draft.documents[model] = payload.data.results;
        break;
      }

      case types.UPDATE_LINK_DOCUMENT_DATA: {
        const { model } = payload.params;
        draft.documents[model] = payload.data;
        break;
      }

      case types.DELETE_LINK_DOCUMENT_DATA: {
        const { model } = payload.params;
        delete draft.documents[model];
        break;
      }

      default:
        return draft;
    }
  });
