import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const uiAdapter = createEntityAdapter();

const initialState = uiAdapter.getInitialState({
  idSelectedChannel: null,
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addUser: uiAdapter.addOne,
    setUsers: uiAdapter.setAll,
  },
});

export const selectors = uiAdapter.getSelectors((state) => state.ui);
export const { actions } = uiSlice;
export default uiSlice.reducer;
