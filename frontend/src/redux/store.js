import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productApi } from './features/productApi';
import { authApi } from './features/auth/authApi';
import authSlice from './features/auth/authSlice';
import delSlice from './features/auth/delSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Corrected persistConfig (removed type field)
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  del: delSlice,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['register'], // Ignore specific paths in state that might cause serializability issues
      },
    }).concat([productApi.middleware, authApi.middleware]),
});

export const persistor = persistStore(store);
