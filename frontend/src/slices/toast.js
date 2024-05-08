import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const toastAdapter = createEntityAdapter();

const initialState = toastAdapter.getInitialState();

const isRejectedAction = (action) => action.type.endsWith('rejected');
const isFulfilledAction = (action) => action.type.endsWith('fulfilled');

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isRejectedAction, (state, payload) => {
      toastAdapter.setAll(state, [{ id: 1, code: payload.error.code }]);
    }).addMatcher(isFulfilledAction, (state, payload) => {
      switch (true) {
        case /postNewChannel/.test(payload.type):
          toastAdapter.setAll(state, [{ id: 0, code: 'CHANNEL_CREATED' }]);
          break;
        case /renameChannel/.test(payload.type):
          toastAdapter.setAll(state, [{ id: 0, code: 'CHANNEL_RENAMED' }]);
          break;
        case /deleteChannel/.test(payload.type):
          toastAdapter.setAll(state, [{ id: 0, code: 'CHANNEL_DELETED' }]);
          break;
        default:
          break;
      }
    });
  },
});

export const toastSelectors = toastAdapter.getSelectors((state) => state.toast);
export const toastActions = toastSlice.actions;

export default toastSlice.reducer;
