import React, { PureComponent } from 'react'
import { Observable } from 'rxjs'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import { connect } from 'react-redux'
import { setRates } from 'reducers/modules/exchange'

@connect(({ exchangePage: { rates } }, props) => ({}), {
  setRates
})
class ExchangeContainer extends PureComponent {
  componentWillMount() {
    const { setRates } = this.props
    this.poll$ = Observable.interval(10000)
      .flatMap(() => axios({
        url: 'https://openexchangerates.org/api/latest.json?app_id=0ef144f7bde04230a918803ce8a0e50f',
        adapter: jsonpAdapter
      }))
      .map(res => res.data)
      .map(data => data.rates)
      .subscribe(setRates)
  }

  componentWillUnmount() {
    this.poll$.unsubscribe()
  }

  render() {
    return (
      <div className='exchangePageContainer'>

      </div>
    )
  }
}

export default ExchangeContainer
