import React, { PureComponent } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import { defaultProps, propTypes } from 'schemas/ExchangeToSchema'
import AccountBalance from 'components/AccountBalance'
import { convertTo, convertFrom } from 'helpers/money'
import cx from 'classnames'
import baseStyles from 'styles/base.styl'
import styles from './ExchangeTo.styl'

export default class extends PureComponent {
  static defaultProps = defaultProps
  static propTypes = propTypes

  render() {

    const { currency , balance, amount, rate, base} = this.props;
    const convertedAmount = convertTo(amount, rate);
    return (
      <div className={cx(baseStyles.container, styles.container)}>
        <div className={styles.leftColumn}>
          <AccountBalance currency={currency} balance={balance} />
        </div>
        <div className={styles.rightColumn}>
          <div>{convertedAmount > 0 && '+'}<span>{convertedAmount !== 0 ? convertedAmount : null}</span></div>
          <span className={styles.backConvert}>{getSymbolFromCurrency(currency)}1 = {getSymbolFromCurrency(base)} {convertFrom(1, rate)}</span>
        </div>

      </div>
    )
  }
}
