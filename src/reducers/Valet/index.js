import { createReducer } from 'redux-act'

const initialState = {
  accounts: {
    GBP: 100,
    USD: 100,
    EUR: 100
  }
}
const reducer = createReducer(on => {}, initialState)

export default reducer
