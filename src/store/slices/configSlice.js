import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startingDate: null,
  duration: null,
  numberOfChallenges: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
