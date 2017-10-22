import React, { PureComponent } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import { propOr } from 'ramda'
export default class extends PureComponent {
  render() {
    const { base, to, rate } = this.props
    return (
      <div className='CurrenciesPairsSelector'>
        <select>
          <option>{getSymbolFromCurrency(base)}1 = {getSymbolFromCurrency(to)}{1 * rate}</option>
        </select>
      </div>
    )
  }
}
