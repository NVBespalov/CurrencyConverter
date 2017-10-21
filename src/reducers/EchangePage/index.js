import { createAction, createReducer } from 'redux-act'

const initialState = {
  rates: {}
}
export const setRates = createAction('Revolut/exchange/SET_RATES')
export const setCurrencies = createAction('Revolut/exchange/SET_CURRENCIES')
export const setAmount = createAction('Revolut/exchange/SET_AMOUNT')

const handleSetRates = (state, rates) => ({ ...state, rates })
const handleSetCurrencies = (state, currencies) => ({ ...state, currencies })
const handleSetAmount = (state, amount) => ({ ...state, amount })
const reducer = createReducer(on => {
  on(setRates, handleSetRates)
  on(setCurrencies, handleSetCurrencies)
  on(setAmount, handleSetAmount)
}, initialState)

export default reducer
