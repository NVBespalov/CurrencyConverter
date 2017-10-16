import React, { PureComponent } from 'react'
import { Observable } from 'rxjs'
import Rest from 'utils/XHR'


class ExchangeContainer extends PureComponent {
  componentWillMount() {
    this.poll$ = Observable.interval(10000).subscribe(
      () => Rest({method:'GET', url:'https://openexchangerates.org/api/latest.json?app_id=0ef144f7bde04230a918803ce8a0e50f'})
    )
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
