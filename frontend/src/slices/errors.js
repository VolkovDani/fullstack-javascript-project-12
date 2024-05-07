import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const errorsAdapter = createEntityAdapter();

const initialState = errorsAdapter.getInitialState();

const isRejectedAction = (action) => action.type.endsWith('rejected');

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isRejectedAction, (state, payload) => {
      errorsAdapter.setAll(state, [{ id: 0, code: payload.error.code }]);
      console.log(payload.error);
    });
  },
});

export const errorsSelectors = errorsAdapter.getSelectors((state) => state.errors);
export const errorsActions = errorsSlice.actions;

export default errorsSlice.reducer;
