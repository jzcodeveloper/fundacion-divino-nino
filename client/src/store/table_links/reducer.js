import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_TABLE_LINK_DOCUMENTS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_TABLE_LINK_DOCUMENTS_SUCCESS:
        draft.loading = false;
        draft.error = null;
        break;

      case types.FETCH_TABLE_LINK_DOCUMENTS_FAILURE:
        draft.loading = false;
        draft.error = payload;
        break;

      case types.CREATE_TABLE_LINK_DOCUMENT_DATA: {
        const key = Object.values(payload.params).join("|");
        draft.documents[key] = payload.data.results;
        break;
      }

      case types.UPDATE_TABLE_LINK_DOCUMENT_DATA: {
        const key = Object.values(payload.params).join("|");
        draft.documents[key] = payload.data;
        break;
      }

      case types.DELETE_TABLE_LINK_DOCUMENT_DATA: {
        const key = Object.values(payload.params).join("|");
        delete draft.documents[key];
        break;
      }

      default:
        return draft;
    }
  });
