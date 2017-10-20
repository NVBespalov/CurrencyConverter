import React, { PureComponent } from 'react'
import styles from './ExchangeFrom.styl'

export default class extends PureComponent {
  render() {
    return (
      <div className='ExchangeFrom'>
        <div className={styles.leftColumn}>
          <span>GBP</span>
          <span>You Have f100</span>
        </div>
        <div className={styles.rightColumn}>
          <span>GBP</span>
          <span>You Have f100</span>
        </div>
      </div>
    )
  }
}
