import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChannels } from './channels';

const uiAdapter = createEntityAdapter();

const initialState = uiAdapter.getInitialState({
  idSelectedChannel: null,
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => Object.assign(state, { idSelectedChannel: payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, { payload }) => {
      if (state.idSelectedChannel === null) {
        return Object.assign(state, {
          idSelectedChannel: payload[0].id,
        });
      }
      return state;
    });
  },
});

export const selectors = uiSlice;
export const { actions } = uiSlice;
export default uiSlice.reducer;
