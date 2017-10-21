import React, { PureComponent } from 'react'
import { Observable } from 'rxjs'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPage'
import axios from 'axios'
import ExchangeRatesPage from 'components/ExchangeRatesPage'
import jsonpAdapter from 'axios-jsonp'
import { connect } from 'react-redux'
import { setRates, setCurrencies } from 'reducers/EchangePage'

const fetchRates = ({ base }) => axios({
  url: `https://api.fixer.io/latest?base=${base}`,
  adapter: jsonpAdapter
})

@connect(({ exchangePage, valet: { accounts } }, props) => ({ ...exchangePage, accounts }), {
  setRates,
  setCurrencies
})
class ExchangeContainer extends PureComponent {

  static defaultProps = ExchangeRatesPageComponentSchema.defaultProps

  static propTypes = ExchangeRatesPageComponentSchema.propTypes

  componentWillMount() {
    const { setRates, setCurrencies, base } = this.props
    Observable
      .fromPromise(fetchRates({ base: 'USD' }))
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
