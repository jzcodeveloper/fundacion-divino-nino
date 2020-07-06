import { createSelector } from "reselect";
import { selectUserRole } from "../user/selectors";

const doctypesState = (state) => state.doctypes;

export const selectError = createSelector(
  [doctypesState],
  (doctypes) => doctypes.error
);

export const selectLoading = createSelector(
  [doctypesState],
  (doctypes) => doctypes.loading
);

export const selectDoctypes = createSelector(
  [doctypesState],
  (doctypes) => doctypes.doctypes.results
);

export const selectMainDoctypes = createSelector([selectDoctypes], (doctypes) =>
  doctypes.filter((doc) => !doc.is_table)
);

export const selectSubDoctypes = createSelector([selectDoctypes], (doctypes) =>
  doctypes.filter((doc) => !!doc.is_table)
);

export const selectDoctype = (name) =>
  createSelector([selectDoctypes], (doctypes) =>
    doctypes.find((doc) => doc.name === name)
  );

export const selectDoctypeFields = (doctype) =>
  createSelector([selectDoctype(doctype)], (doctype) =>
    doctype ? doctype.fields : []
  );

export const selectDoctypeListFields = (doctype) =>
  createSelector([selectDoctypeFields(doctype)], (fields) =>
    fields
      .filter((field) => !!field.in_list_view)
      .sort((a, b) => a.index - b.index)
  );

export const selectDoctypeDependentFields = (doctype) =>
  createSelector([selectDoctypeFields(doctype)], (fields) =>
    fields.filter((field) => field.depends_on)
  );

export const selectDoctypeQuickEntryFields = (doctype) =>
  createSelector([selectDoctypeFields(doctype)], (fields) =>
    fields.filter((field) => field.in_quick_entry)
  );

export const selectDoctypeSearchFields = (doctype) =>
  createSelector([selectDoctype(doctype)], (doctype) => {
    const search_fields = doctype.search_fields.split(",");
    const index = search_fields.findIndex(
      (search_field) => search_field === "name"
    );
    search_fields.splice(index, 1);
    return search_fields.map((search_field) =>
      doctype.fields.find((field) => field.field_name === search_field)
    );
  });

export const selectAllowedDoctypes = createSelector(
  [selectMainDoctypes, selectUserRole],
  (doctypes, role) => {
    return doctypes.filter((doctype) => {
      const permission = doctype.permissions.find((doc) => doc.role === role);
      return permission ? permission.read : false;
    });
  }
);

export const selectDoctypePermissions = (doctype) =>
  createSelector([selectDoctype(doctype), selectUserRole], (doctype, role) => {
    return doctype.permissions.find((doc) => doc.role === role);
  });
