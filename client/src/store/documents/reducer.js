import { types } from "./types";
import produce from "immer";

import { initialState, defaultConfig } from "./model";

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_DOCUMENTS_REQUEST:
        draft.loading = true;
        break;

      case types.FETCH_DOCUMENTS_SUCCESS: {
        const { model, data } = payload;
        if (draft.documents[model] === undefined) {
          draft.documents[model] = {
            limit: 20,
            sort_field: { field_name: "updated_at", label: "Actualizado El" },
            sort_order: "asc",
          };
        }
        draft.documents[model].results = data.results;
        draft.loading = false;
        draft.error = null;
        break;
      }

      case types.FETCH_DOCUMENTS_FAILURE:
        draft.loading = false;
        draft.error = null;
        break;

      case types.SET_LIST_LIMIT: {
        const { model, limit } = payload;
        draft.documents[model].limit = limit;
        break;
      }

      case types.SET_LIST_SORT_FIELD: {
        const { model, sort_field } = payload;
        draft.documents[model].sort_field = sort_field;
        break;
      }

      case types.SET_LIST_SORT_ORDER: {
        const { model, sort_order } = payload;
        draft.documents[model].sort_order = sort_order;
        break;
      }

      case types.RESET_DOCUMENTS: {
        const { model } = payload;
        draft.documents[model].results = [];
        break;
      }

      default:
        return draft;
    }
  });
