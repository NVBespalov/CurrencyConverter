/**
 * Created by nbespalov on 11.04.2017.
 */
import { combineReducers } from 'redux'
import exchangePage from './EchangePage'
import valet from './Valet'

const appReducer = combineReducers({
  exchangePage,
  valet
})


export default appReducer

