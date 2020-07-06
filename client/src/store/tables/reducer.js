import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_TABLE_DOCUMENTS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_TABLE_DOCUMENTS_SUCCESS:
        draft.loading = false;
        draft.error = null;
        break;

      case types.FETCH_TABLE_DOCUMENTS_FAILURE:
        draft.loading = false;
        draft.error = payload;
        break;

      case types.CREATE_TABLE_DOCUMENT_DATA: {
        const { model, parent_model, parent_name, data } = payload;
        const key = [model, parent_model, parent_name].join(" - ");
        draft.documents[key] = data.results;

        break;
      }

      case types.UPDATE_TABLE_DOCUMENT_DATA: {
        const { model, parent_model, parent_name, data } = payload;
        const key = [model, parent_model, parent_name].join(" - ");
        draft.documents[key] = data;
        break;
      }

      case types.DELETE_TABLE_DOCUMENT_DATA: {
        const { model, parent_model, parent_name, data } = payload;
        const key = [model, parent_model, parent_name].join(" - ");
        delete draft.documents[key];
        break;
      }

      default:
        return draft;
    }
  });
