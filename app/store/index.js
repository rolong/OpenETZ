import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'


import tradingManageReducer from '../reducers/tradingManageReducer'
import accountManageReducer from '../reducers/accountManageReducer'
import tokenManageReducer from '../reducers/tokenManageReducer'
import switchLanguageReducer from '../reducers/switchLanguageReducer'

const rootReducer = combineReducers({
  	tradingManageReducer,
  	accountManageReducer,
  	tokenManageReducer,
  	switchLanguageReducer,
})
const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
)

export default store