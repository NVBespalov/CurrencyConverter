import React, { PureComponent } from 'react'
import { Observable } from 'rxjs'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPage'
import axios from 'axios'
import ExchangeRatesPage from 'components/ExchangeRatesPage'
import jsonpAdapter from 'axios-jsonp'
import { connect } from 'react-redux'
import { setRates, setCurrencies } from 'reducers/EchangePage'

const API_ID = '0ef144f7bde04230a918803ce8a0e50f'

const fetchRates = ({ base }) => axios({
  url: `https://openexchangerates.org/api/latest.json?app_id=${API_ID}&base=${base}`,
  adapter: jsonpAdapter
})

const fetchCurrencies = () => axios({
  url: 'https://openexchangerates.org/api/currencies.json?app_id=0ef144f7bde04230a918803ce8a0e50f',
  adapter: jsonpAdapter
})

@connect(({ exchangePage }, props) => ({ ...exchangePage }), {
  setRates,
  setCurrencies
})
class ExchangeContainer extends PureComponent {

  static defaultProps = ExchangeRatesPageComponentSchema.defaultProps

  static propTypes = ExchangeRatesPageComponentSchema.propTypes

  componentWillMount() {
    const { setRates, setCurrencies, base } = this.props
    Observable
      .fromPromise(fetchCurrencies())
      .map(res => res.data)
      .subscribe(setCurrencies)

    fetchRates({ base })

    this.poll$ = Observable.interval(10000)
      .flatMap(() => fetchRates({ base }))
      .map(res => res.data)
      .map(data => data.rates)
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
