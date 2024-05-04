import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
  },
  reducers: {
    setAuth: (state, { payload }) => Object.assign(state, payload),
    removeAuth: () => ({
      username: null,
      token: null,
    }),
  },
});

export const getAuth = (state) => state.auth;
export const authActions = authSlice.actions;
export default authSlice.reducer;
