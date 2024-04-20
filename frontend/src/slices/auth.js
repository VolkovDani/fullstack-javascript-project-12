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

export const selectors = authSlice;
export const { actions } = authSlice;
export default authSlice.reducer;
