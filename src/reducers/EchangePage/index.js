import { createAction, createReducer } from 'redux-act'

const initialState = {
  rates: {}
}
export const setRates = createAction('Revolut/exchange/SET_RATES')
export const setCurrencies = createAction('Revolut/exchange/SET_CURRENCIES')

const handleSetRates = (state, payload) => ({ ...state, rates: payload })
const handleSetCurrencies = (state, payload) => ({ ...state, currencies: payload })
const reducer = createReducer(on => {
  on(setRates, handleSetRates)
  on(setCurrencies, handleSetCurrencies)
}, initialState)

export default reducer
