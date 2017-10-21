import React, { PureComponent } from 'react'
import styles from './ExchangeFrom.styl'
import baseStyles from '../../styles/base.styl'
import cx from 'classnames'

export default class extends PureComponent {
  render() {
    return (
      <div className={baseStyles.container}>
        <div className={styles.leftColumn}>
          <div className={cx(baseStyles.column, baseStyles.center)}>
            <span>GBP</span>
            <span>You Have f100</span></div>
        </div>
        <div className={styles.rightColumn}>
          <input className={styles.amount} />
        </div>
      </div>
    )
  }
}
