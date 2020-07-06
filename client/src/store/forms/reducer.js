import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_FORM_DOCUMENT_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_FORM_DOCUMENT_SUCCESS:
        draft.loading = false;
        draft.error = null;
        break;

      case types.FETCH_FORM_DOCUMENT_FAILURE:
        draft.loading = false;
        draft.error = payload;
        break;

      case types.CREATE_FORM_DOCUMENT_DATA:
        draft.documents[payload.name] = payload.data.results[0];
        break;

      case types.UPDATE_FORM_DOCUMENT_DATA:
        draft.documents[payload.name] = payload.data;
        break;

      case types.DELETE_FORM_DOCUMENT_DATA:
        delete draft.documents[payload.name];
        break;

      default:
        return draft;
    }
  });
