// import { configureStore } from '@reduxjs/toolkit'
// import adminSlice from '../features/adminSlice'
// import doctorSlice from '../features/doctorSlice'
// import categorySlice from '../features/categorySlice'
// import userSlice from '../features/userSlice'
// import doctorDetailsSlice from '../features/doctorDetailsSlice'

// export default configureStore({
//   reducer: {
//    admin:adminSlice,
//     doctor:doctorSlice,
//     department:categorySlice,
//     user:userSlice,
//     doctorData:doctorDetailsSlice
    
//   }
// })

import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import adminSlice from '../features/adminSlice'
import doctorSlice from '../features/doctorSlice'
import categorySlice from '../features/categorySlice'
import userSlice from '../features/userSlice'
import doctorDetailsSlice from '../features/doctorDetailsSlice'
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user'] // only persist the 'user' slice
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  admin:adminSlice,
  doctor:doctorSlice,
  department:categorySlice,
  user:userSlice,
  doctorData:doctorDetailsSlice
}))

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

export { store, persistor }
