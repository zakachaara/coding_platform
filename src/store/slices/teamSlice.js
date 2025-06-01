import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setTeam } = teamSlice.actions;
export default teamSlice.reducer;
