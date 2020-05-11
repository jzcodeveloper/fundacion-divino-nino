import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_MODELS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_MODELS_SUCCESS:
        draft.models = payload;
        draft.error = null;
        draft.loading = false;
        break;

      case types.TRAIN_MODEL_REQUEST:
        draft.training = true;
        break;

      case types.TEST_MODEL_REQUEST:
        draft.testing = true;
        break;

      case types.CREATE_MODEL_SUCCESS:
        draft.models.push(payload.model);
        draft.error = null;
        break;

      case types.TRAIN_MODEL_SUCCESS:
      case types.TEST_MODEL_SUCCESS:
      case types.UPDATE_MODEL_SUCCESS: {
        const index = draft.models.findIndex(
          model => model._id === payload._id
        );
        draft.models[index] = payload;
        draft.training = false;
        draft.testing = false;
        draft.error = null;
        break;
      }

      case types.DELETE_MODEL_SUCCESS: {
        const index = draft.models.findIndex(
          model => model._id === payload._id
        );
        draft.models.splice(index, 1);
        draft.error = null;
        break;
      }

      case types.TRAIN_MODEL_FAILURE:
      case types.TEST_MODEL_FAILURE:
      case types.FETCH_MODELS_FAILURE:
        draft.training = false;
        draft.testing = false;
        draft.error = payload;
        draft.loading = false;
        break;

      default:
        return draft;
    }
  });
