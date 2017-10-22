import React, { PureComponent } from 'react'
import { Observable } from 'rxjs'
import { keys, compose, pathOr } from 'ramda'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPageSchema'
import axios from 'axios'
import ExchangeRatesPage from 'components/ExchangeRatesPage'
import jsonpAdapter from 'axios-jsonp'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { setRates, setCurrencies, setAmount } from 'reducers/EchangePage'

const fetchRates = ({ base }) => axios({
  url: `https://api.fixer.io/latest?base=${base}`,
  adapter: jsonpAdapter
})


@connect(({ exchangePage, wallet: { accounts } }, props) => ({ ...exchangePage, accounts }), {
  setRates,
  setCurrencies,
  setAmount
})
@reduxForm(
  {
    form: 'exchange',
    onSubmit: () => {

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
