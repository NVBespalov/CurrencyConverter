import React, { PureComponent } from 'react'
import ExchangeRatesPageComponentSchema from 'schemas/ExchangeRatesPage'
import NavBar from 'components/NavBar'
import ExchangeFrom from 'components/ExchangeFrom'
import ExchangeTo from 'components/ExchangeTo'

export default class extends PureComponent {
  static defaultProps = ExchangeRatesPageComponentSchema.defaultProps

  static propTypes = ExchangeRatesPageComponentSchema.propTypes

  render() {
    const { currencies, rates } = this.props;
    return (
      <div className='exchangePage'>
        <NavBar />
        <ExchangeFrom />
        <ExchangeTo />
      </div>
    )
  }
}
