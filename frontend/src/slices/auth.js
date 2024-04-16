import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    token: '',
  },
  reducers: {
    setAuth: (state, { payload }) => Object.assign(state, payload),
    removeAuth: (state) => state,
  },
});

export const selectors = authSlice.getSelectors((state) => state.auth);
export const { actions } = authSlice;
export default authSlice.reducer;
