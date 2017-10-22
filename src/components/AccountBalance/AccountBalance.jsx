import React, { PureComponent } from 'react'
import cx from 'classnames'
import baseStyles from 'styles/base.styl'
import getSymbolFromCurrency from 'currency-symbol-map'
export default class extends PureComponent {
  render() {
    const { currency } = this.props
    return (
      <div className={cx(baseStyles.column, baseStyles.center)}>
        <span>{currency}</span>
        <span>You Have {getSymbolFromCurrency(currency)}{this.props.balance}</span>
      </div>
    )
  }
}
