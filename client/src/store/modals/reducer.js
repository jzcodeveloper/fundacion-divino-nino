import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";
export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.SHOW_TASK_FORM_REQUEST:
        draft.task.id = payload;
        draft.task.taskForm = true;
        break;

      case types.SHOW_TASK_VIEW_REQUEST:
        draft.task.id = payload;
        draft.task.taskView = true;
        break;

      case types.SHOW_TASK_DISABLE_WARNING_REQUEST:
        draft.task.id = payload;
        draft.task.disableWarning = true;
        break;

      case types.SHOW_TASK_DELETE_WARNING_REQUEST:
        draft.task.id = payload;
        draft.task.deleteWarning = true;
        break;

      case types.HIDE_TASK_FORM_REQUEST:
        draft.task.taskForm = false;
        break;

      case types.HIDE_TASK_VIEW_REQUEST:
        draft.task.taskView = false;
        break;

      case types.HIDE_TASK_DISABLE_WARNING_REQUEST:
        draft.task.disableWarning = false;
        break;

      case types.HIDE_TASK_DELETE_WARNING_REQUEST:
        draft.task.deleteWarning = false;
        break;

      case types.SHOW_MODEL_FORM_REQUEST:
        draft.model.id = payload;
        draft.model.modelForm = true;
        break;

      case types.SHOW_MODEL_VIEW_REQUEST:
        draft.model.id = payload;
        draft.model.modelView = true;
        break;

      case types.SHOW_MODEL_TRAINING_VIEW_REQUEST:
        draft.model.id = payload;
        draft.model.trainingView = true;
        break;

      case types.SHOW_MODEL_TESTING_VIEW_REQUEST:
        draft.model.id = payload;
        draft.model.testingView = true;
        break;

      case types.SHOW_MODEL_DELETE_WARNING_REQUEST:
        draft.model.id = payload;
        draft.model.deleteWarning = true;
        break;

      case types.HIDE_MODEL_FORM_REQUEST:
        draft.model.modelForm = false;
        break;

      case types.HIDE_MODEL_VIEW_REQUEST:
        draft.model.modelView = false;
        break;

      case types.HIDE_MODEL_TRAINING_VIEW_REQUEST:
        draft.model.trainingView = false;
        break;

      case types.HIDE_MODEL_TESTING_VIEW_REQUEST:
        draft.model.testingView = false;
        break;

      case types.HIDE_MODEL_DELETE_WARNING_REQUEST:
        draft.model.deleteWarning = false;
        break;

      case types.SHOW_DATASET_VIEW_REQUEST:
        draft.dataset.id = payload;
        draft.dataset.datasetView = true;
        break;

      case types.SHOW_DATASET_DOWNLOAD_REQUEST:
        draft.dataset.id = payload;
        draft.dataset.download = true;
        break;

      case types.SHOW_DATASET_SPLIT_WARNING_REQUEST:
        draft.dataset.id = payload;
        draft.dataset.splitWarning = true;
        break;

      case types.SHOW_DATASET_EMPTY_WARNING_REQUEST:
        draft.dataset.id = payload;
        draft.dataset.emptyWarning = true;
        break;

      case types.HIDE_DATASET_VIEW_REQUEST:
        draft.dataset.datasetView = false;
        break;

      case types.HIDE_DATASET_DOWNLOAD_REQUEST:
        draft.dataset.download = false;
        break;

      case types.HIDE_DATASET_SPLIT_WARNING_REQUEST:
        draft.dataset.splitWarning = false;
        break;

      case types.HIDE_DATASET_EMPTY_WARNING_REQUEST:
        draft.dataset.emptyWarning = false;
        break;

      default:
        return draft;
    }
  });
