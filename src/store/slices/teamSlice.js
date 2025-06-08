import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setId } = teamSlice.actions;
export default teamSlice.reducer;
