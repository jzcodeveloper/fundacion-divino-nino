import { types } from "./types";
import produce from "immer";

import { initialState } from "./model";

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_TASKS_REQUEST:
        draft.loading = true;
        break;

      case types.CREATE_TASK_SUCCESS:
        draft.tasks.push(payload.task);
        draft.error = null;
        break;

      case types.UPDATE_TASK_SUCCESS: {
        const index = draft.tasks.findIndex(
          task => task._id === payload.task._id
        );
        draft.tasks[index] = payload.task;
        draft.error = null;
        break;
      }

      case types.DELETE_TASK_SUCCESS: {
        const index = draft.tasks.findIndex(task => task._id === payload._id);
        draft.tasks.splice(index, 1);
        draft.error = null;
        break;
      }

      case types.DISABLE_TASK_SUCCESS: {
        const index = draft.tasks.findIndex(task => task._id === payload._id);
        draft.tasks[index].enabled = !draft.tasks[index].enabled;
        draft.error = null;
        break;
      }

      case types.FETCH_TASKS_SUCCESS:
        draft.tasks = payload;
        draft.error = null;
        draft.loading = false;
        break;

      case types.CREATE_TASK_FAILURE:
      case types.UPDATE_TASK_FAILURE:
      case types.DELETE_TASK_FAILURE:
      case types.FETCH_TASKS_FAILURE:
      case types.DISABLE_TASK_FAILURE:
        draft.error = payload;
        draft.loading = false;
        break;

      default:
        return draft;
    }
  });
