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
    setCurrentChannel: (state, { payload }) => {
      console.log(payload);
      return Object.assign(state, { idSelectedChannel: payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        console.log('ui/extra', payload);
        return Object.assign(state, { idSelectedChannel: payload[0].id });
      });
  },
});

export const selectors = uiSlice;
export const { actions } = uiSlice;
export default uiSlice.reducer;
