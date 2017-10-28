import React, { PureComponent } from 'react'
import { propOr, pathOr } from 'ramda'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPageSchema'
import NavBar from 'components/NavBar'
import ExchangeFrom from 'components/ExchangeFrom'
import ExchangeTo from 'components/ExchangeTo'
import CurrenciesPairsSelector from 'components/CurrenciesPairsSelector'
import styles from './ExchangeRatesPage.styl'

export default class extends PureComponent {
  static defaultProps = ExchangeRatesPageComponentSchema.defaultProps

  static propTypes = ExchangeRatesPageComponentSchema.propTypes

  render() {
    const { rate, handleSubmit, amount, base, to, submitting, pristine, convertedTo, perOneConvertedFrom, balanceBase, balanceTo } = this.props
    const disabled = pristine || submitting || amount === 0

    return (
      <div className={styles.container}>
        <NavBar>
          <button className={styles.flatButton} >cancel</button>
          <CurrenciesPairsSelector base={base} to={to} rate={rate} />
          <button onClick={handleSubmit} disabled={disabled} className={styles.flatButton}>Exchange</button>
        </NavBar>
        <ExchangeFrom amount={amount} currency={base} balance={balanceBase} />
        <ExchangeTo
          currency={to} base={base} balance={balanceTo} convertedTo={convertedTo}
          perOneConvertedFrom={perOneConvertedFrom}
        />
      </div>
    )
  }
}
