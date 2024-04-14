import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    token: '',
  },
  reducers: {
    setAuth: (state, payload) => {
      console.log(payload);
      return state;
    },
    removeAuth: (state) => state,
  },
});

export const selectors = authSlice.getSelectors((state) => state.auth);
export const { actions } = authSlice;
export default authSlice.reducer;
