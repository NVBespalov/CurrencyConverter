import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { propTypes, defaultProps } from 'schemas/ExchangeFromSchema'
import AccountBalance from 'components/AccountBalance'
import cx from 'classnames'
import styles from './ExchangeFrom.styl'
import baseStyles from 'styles/base.styl'

export default class extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  normalizeFieldValue = value => (this.props.balance < parseInt(value, 10) ? this.props.balance : value)
  render() {
    return (
      <div
        className={cx(baseStyles.container, styles.container)}
      >
        <div className={styles.leftColumn}>
          <AccountBalance currency={this.props.currency} balance={this.props.balance} />
        </div>
        <div className={styles.rightColumn}>
          <Field
            name='amount'
            className={styles.amount}
            component='input'
            type='number'
            min={0}
            autoFocus
            max={this.props.balance}
            normalize={this.normalizeFieldValue}
          />
        </div>
      </div>
    )
  }
}
