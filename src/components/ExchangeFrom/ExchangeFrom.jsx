import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Field } from 'redux-form'
import { propTypes, defaultProps } from 'schemas/ExchangeFromSchema'
import styles from './ExchangeFrom.styl'
import baseStyles from '../../styles/base.styl'

export default class extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    return (
      <div className={baseStyles.container}>
        <div className={styles.leftColumn}>
          <div className={cx(baseStyles.column, baseStyles.center)}>
            <span>{this.props.currency}</span>
            <span>You Have {this.props.balance}</span>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <Field name='amount' className={styles.amount} component="input" type="number" min={0} />
        </div>
      </div>
    )
  }
}
