import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.LOGIN_USER_SUCCESS:
        draft.token = payload;
        draft.error = null;
        draft.authenticated = true;
        break;

      case types.LOGIN_USER_FAILURE:
        draft.token = null;
        draft.error = payload;
        draft.authenticated = false;
        break;

      case types.GET_USER_SUCCESS:
        draft.user = payload;
        draft.error = null;
        break;

      case types.GET_USER_FAILURE:
        draft.user = null;
        draft.error = payload;
        break;

      case types.LOGOUT_USER_REQUEST:
        draft.user = null;
        draft.token = null;
        draft.error = null;
        draft.loading = true;
        draft.authenticated = false;
        break;

      default:
        return draft;
    }
  });
