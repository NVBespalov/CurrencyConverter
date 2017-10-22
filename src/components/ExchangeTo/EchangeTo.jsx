import React, { PureComponent } from 'react'
import { defaultProps, propTypes } from 'schemas/ExchangeToSchema'
import AccountBalance from 'components/AccountBalance'
import cx from 'classnames'
import baseStyles from 'styles/base.styl'
import styles from './ExchangeTo.styl'

export default class extends PureComponent {
  static defaultProps = defaultProps
  static propTypes = propTypes

  render() {

    return (
      <div className={cx(baseStyles.container, styles.container)}>
        <div className={styles.leftColumn}>
          <AccountBalance currency={this.props.currency} balance={this.props.balance}/>
        </div>
        <div className={styles.rightColumn}>
          <span>{this.props.amount * this.props.rate}</span>
        </div>
      </div>
    )
  }
}
