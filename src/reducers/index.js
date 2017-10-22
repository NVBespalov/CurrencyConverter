/**
 * Created by nbespalov on 11.04.2017.
 */
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import exchangePage from './EchangePage'
import wallet from './Wallet'

const appReducer = combineReducers({
  exchangePage,
  form,
  wallet
})


export default appReducer

