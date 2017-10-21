import React, { PureComponent } from 'react'
import cx from 'classnames'
import { defaultProps, propTypes } from 'schemas/ExchangeToSchema'
import baseStyles from '../../styles/base.styl'
import styles from './ExchangeTo.styl'

export default class extends PureComponent {
  static defaultProps = defaultProps
  static propTypes = propTypes

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
          <span>{this.props.amount * this.props.rate}</span>
        </div>
      </div>
    )
  }
}
