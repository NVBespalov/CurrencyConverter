import React, { PureComponent } from 'react'
import { propOr } from 'ramda'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPageSchema'
import NavBar from 'components/NavBar'
import ExchangeFrom from 'components/ExchangeFrom'
import ExchangeTo from 'components/ExchangeTo'
import CurrenciesPairsSelector from 'components/CurrenciesPairsSelector'

export default class extends PureComponent {
  static defaultProps = ExchangeRatesPageComponentSchema.defaultProps

  static propTypes = ExchangeRatesPageComponentSchema.propTypes

  render() {
    const { rates, handleSubmit, amount } = this.props

    return (
      <div className='exchangePage'>
        <NavBar>
          <button>cancel</button>
          <CurrenciesPairsSelector />
          <button onClick={handleSubmit}>Exchange</button>
        </NavBar>
        <ExchangeFrom currency={'USD'} balance={100} />
        <ExchangeTo currency={'EUR'} balance={100} amount={amount} rate={propOr(0, 'EUR', rates)}/>
      </div>
    )
  }
}
