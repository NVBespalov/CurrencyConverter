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
    const { rates, handleSubmit, amount, accounts, base, to, submitting, pristine } = this.props
    const disabled = pristine || submitting || amount === 0
    const rate = propOr(0, to, rates)

    return (
      <div className={styles.container}>
        <NavBar>
          <button>cancel</button>
          <CurrenciesPairsSelector base={base} to={to} rate={rate}/>
          <button onClick={handleSubmit} disabled={disabled}>Exchange</button>
        </NavBar>
        <ExchangeFrom amount={amount} currency={base} balance={propOr(0, base, accounts)} />
        <ExchangeTo currency={to} base={base} balance={propOr(0, to, accounts)} amount={amount} rate={rate} />
      </div>
    )
  }
}
