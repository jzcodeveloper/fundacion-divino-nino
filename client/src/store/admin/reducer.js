import { types } from "./types";
import { types as userTypes } from "../user/types";
import { types as taskTypes } from "../tasks/types";
import { types as modelTypes } from "../models/types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.LOGIN_ADMIN_SUCCESS:
        draft.token = payload;
        draft.error = null;
        draft.authenticated = true;
        break;

      case types.LOGIN_ADMIN_FAILURE:
        draft.token = null;
        draft.error = payload;
        draft.authenticated = false;
        break;

      case types.GET_ADMIN_SUCCESS:
      case types.UPDATE_ADMIN_SUCCESS:
        draft.admin = payload;
        draft.error = null;
        break;

      case types.GET_ADMIN_FAILURE:
        draft.admin = null;
        draft.error = payload;
        break;

      case types.LOGOUT_ADMIN_REQUEST:
      case userTypes.LOGOUT_USER_REQUEST:
        draft.admin = null;
        draft.token = null;
        draft.error = null;
        draft.loading = true;
        draft.authenticated = false;
        break;

      case taskTypes.CREATE_TASK_SUCCESS:
      case modelTypes.CREATE_MODEL_SUCCESS:
        draft.admin = payload.admin;
        break;

      case types.FETCH_LOGS_REQUEST:
        draft.logs.loading = true;
        break;

      case types.FETCH_LOGS_SUCCESS:
        draft.logs.total = payload.total;
        draft.logs.results[payload.page] = payload.results;
        draft.logs.error = null;
        draft.logs.loading = false;
        break;

      case types.FETCH_LOGS_FAILURE:
        draft.logs.error = payload;
        draft.logs.loading = false;
        break;

      default:
        return draft;
    }
  });
