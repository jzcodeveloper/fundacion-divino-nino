import { createSelector } from "reselect";
import {
  selectAdmin,
  selectToken as selectAdminToken,
  selectAuthenticated as selectAdminAuthenticated,
} from "../admin/selectors";
import {
  selectContributor,
  selectToken as selectContributorToken,
  selectAuthenticated as selectContributorAuthenticated,
} from "../contributor/selectors";

export const selectUser = createSelector(
  [selectAdmin, selectContributor],
  (admin, contributor) => (admin ? admin : contributor ? contributor : null)
);

export const selectToken = createSelector(
  [selectAdminToken, selectContributorToken],
  (admin, contributor) => (admin ? admin : contributor ? contributor : null)
);

export const selectAuthenticated = createSelector(
  [selectAdminAuthenticated, selectContributorAuthenticated],
  (admin, contributor) => (admin ? admin : contributor ? contributor : null)
);
