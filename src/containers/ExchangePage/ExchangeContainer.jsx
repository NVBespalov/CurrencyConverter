import React, { PureComponent } from 'react'
import { Observable } from 'rxjs'
import { keys, compose, pathOr, propOr, prop } from 'ramda'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPageSchema'
import axios from 'axios'
import ExchangeRatesPage from 'components/ExchangeRatesPage'
import jsonpAdapter from 'axios-jsonp'
import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'
import { setRates, setCurrencies, setAmount } from 'reducers/EchangePage'
import { setAccount } from 'reducers/Wallet'
import { convertTo, convertFrom } from 'helpers/money'

const fetchRates = ({ base }) => axios({
  url: `https://api.fixer.io/latest?base=${base}`,
  adapter: jsonpAdapter
})


@connect(({ exchangePage, exchangePage: { amount, to, base, rates }, wallet: { accounts } }, props) => ({
  ...exchangePage,
  rate: propOr(0, to, rates),
  convertedTo: convertTo(amount, propOr(0, to, rates)) || null,
  perOneConvertedFrom: convertFrom(1, prop(to, rates)) || null,
  balanceBase: propOr(0, base, accounts),
  balanceTo: propOr(0, to, accounts),
  accounts
}), {
  setRates,
  setCurrencies,
  setAmount,
  setAccount
})
@reduxForm(
  {
    form: 'exchange',
    onSubmit: ({}, dispatch, { base, amount, setAccount, to, convertedTo, balanceBase, balanceTo }) => {
      setAccount({ [base]: balanceBase - amount })
      setAccount({ [to]: balanceTo + convertedTo })
      dispatch(reset('exchange'))

    },
    initialValues: {
      amount: 0
    },
    onChange: ({ amount }, _, { setAmount }) => setAmount(parseInt(amount, 10) || 0),
    fields: ['amount']
  }
)
class ExchangeContainer extends PureComponent {

  static defaultProps = ExchangeRatesPageComponentSchema.defaultProps

  static propTypes = ExchangeRatesPageComponentSchema.propTypes

  componentWillMount() {
    const { setRates, setCurrencies, base } = this.props

    fetchRates({ base })
      .then(compose(setRates, pathOr({}, ['data', 'rates'])))
      .then(compose(setCurrencies, keys, pathOr({}, ['data', 'rates'])))

    this.poll$ = Observable
      .interval(10000)
      .flatMap(() => Observable.fromPromise(fetchRates({ base })))
      .map(res => res.data)
      .map(data => data.rates)
      .do(compose(setCurrencies, keys))
      .subscribe(setRates)
  }

  componentWillUnmount() {
    this.poll$.unsubscribe()
  }

  render() {
    return (
      <ExchangeRatesPage {...this.props} />
    )
  }
}

export default ExchangeContainer
