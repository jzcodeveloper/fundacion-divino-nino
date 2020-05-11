import { types } from "./types";
import { types as userTypes } from "../user/types";
import { types as datasetTypes } from "../datasets/types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.LOGIN_CONTRIBUTOR_SUCCESS:
        draft.token = payload;
        draft.error = null;
        draft.authenticated = true;
        break;

      case types.LOGIN_CONTRIBUTOR_FAILURE:
        draft.token = null;
        draft.error = payload;
        draft.authenticated = false;
        break;

      case types.GET_CONTRIBUTOR_SUCCESS:
        draft.contributor = payload;
        draft.error = null;
        break;

      case types.GET_CONTRIBUTOR_FAILURE:
        draft.contributor = null;
        draft.error = payload;
        break;

      case types.LOGOUT_CONTRIBUTOR_REQUEST:
      case userTypes.LOGOUT_USER_REQUEST:
        draft.contributor = null;
        draft.token = null;
        draft.error = null;
        draft.loading = true;
        draft.authenticated = false;
        break;

      case datasetTypes.CREATE_DATA_SUCCESS:
        draft.contributor = payload.contributor;
        break;

      case types.FETCH_HISTORY_REQUEST:
        draft.history.loading = true;
        break;

      case types.FETCH_HISTORY_SUCCESS:
        draft.history.total = payload.total;
        draft.history.results[payload.page] = payload.results;
        draft.history.error = null;
        draft.history.loading = false;
        break;

      case types.FETCH_HISTORY_FAILURE:
        draft.history.error = payload;
        draft.history.loading = false;
        break;

      default:
        return draft;
    }
  });
