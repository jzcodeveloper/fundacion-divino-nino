import { createSelector } from "reselect";

export const userState = (state) => state.user;

export const selectUser = createSelector([userState], (user) => user.user);

export const selectToken = createSelector([userState], (user) => user.token);

export const selectError = createSelector([userState], (user) => user.error);

export const selectLoading = createSelector(
  [userState],
  (user) => user.loading
);

export const selectAuthenticated = createSelector(
  [userState],
  (user) => user.authenticated
);

export const selectUserRole = createSelector([selectUser], (user) => user.role);
