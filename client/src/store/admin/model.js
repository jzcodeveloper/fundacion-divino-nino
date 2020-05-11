export const initialState = Object.freeze({
  admin: null,
  token: null,
  logs: { total: 0, results: {}, error: null, loading: false },
  error: null,
  loading: false,
  authenticated: false
});
