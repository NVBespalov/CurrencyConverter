import React, { PureComponent } from 'react'
import cx from 'classnames'
import baseStyles from '../../styles/base.styl'
import styles from './ExchangeTo.styl'

export default class extends PureComponent {
  render() {
    return (
      <div className={baseStyles.container}>
        <div className={styles.leftColumn}>
          <div className={cx(baseStyles.column, baseStyles.center)}>
            <span>EUR</span>
            <span>You Have e100</span></div>
        </div>
        <div className={styles.rightColumn}>
          <span />
        </div>
      </div>
    )
  }
}
