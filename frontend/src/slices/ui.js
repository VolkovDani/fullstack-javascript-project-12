import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const uiAdapter = createEntityAdapter();

const initialState = uiAdapter.getInitialState({
  idSelectedChannel: null,
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      console.log(payload);
      return Object.assign(state, { idSelectedChannel: payload });
    },
  },
});

export const selectors = uiSlice;
export const { actions } = uiSlice;
export default uiSlice.reducer;
