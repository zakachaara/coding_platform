import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slices/configSlice';
import teamReducer from './slices/teamSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cpProblemsReducer);


export const store = configureStore({
  reducer: {
    config: configReducer,
    team: teamReducer,
  },
});
// export const persistor = persistStore(store);
