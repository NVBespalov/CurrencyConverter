import React, { PureComponent } from 'react'
import { keys as rKeys } from 'ramda'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPage'
const ratesAndCurrenciesContainerStyles = { display: 'flex', alignItems: 'center' }

export default class extends PureComponent {
  static defaultProps = ExchangeRatesPageComponentSchema.defaultProps

  static propTypes = ExchangeRatesPageComponentSchema.propTypes

  render() {
    const { currencies, rates } = this.props;
    return (
      <div className='exchangePageContainer'>
        <span>The base:{this.props.base}</span>
        <div style={ratesAndCurrenciesContainerStyles}>
          <ul>
            {rKeys(currencies).map(key => (<li key={key}>{key}:{currencies[key]}</li>))}
          </ul>
          <ul>
            {rKeys(rates).map(key => (<li key={key}>{key}:{rates[key]}</li>))}
          </ul>
        </div>
      </div>
    )
  }
}
