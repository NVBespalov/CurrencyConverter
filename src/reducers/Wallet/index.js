import { createReducer, createAction } from 'redux-act'

const initialState = {
  accounts: {
    GBP: 100,
    USD: 100,
    EUR: 100
  }
}

export const setAccount = createAction('Revolut/wallet/SET_ACCOUNT')
const handleSetAccount = (state, account) => {
  let newVar = {
    ...state,
    accounts: { ...state.accounts, ...account }
  };
  debugger
  return (newVar);
}
const reducer = createReducer(on => {

  on(setAccount, handleSetAccount)
}, initialState)

export default reducer
