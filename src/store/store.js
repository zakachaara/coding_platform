import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slices/configSlice';
import teamReducer from './slices/teamSlice';

export const store = configureStore({
  reducer: {
    config: configReducer,
    team: teamReducer,
  },
});
