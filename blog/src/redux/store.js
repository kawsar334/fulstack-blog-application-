import { configureStore , combineReducers} from '@reduxjs/toolkit'
import userSlice from './useSlice';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key:"root",
    version:1,
    storage,

}
const rootReducer = combineReducers({ user: userSlice });

const persistReduce = persistReducer(persistConfig,rootReducer )
export const store = configureStore({
    reducer:persistReduce,
    serializableCheck:{
        ignoredActions:[FLUSH, REGISTER, REHYDRATE, PURGE, PERSIST,PAUSE]
    }
});

export const persistStor=persistStore(store)
