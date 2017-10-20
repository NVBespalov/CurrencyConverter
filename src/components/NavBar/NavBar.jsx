import React, { PureComponent } from 'react'
import CurrenciesPairsSelector from 'components/CurrenciesPairsSelector'
import styles from './NavBar.styl'
export default class extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <button>cancel</button>
        <CurrenciesPairsSelector />
        <button>Exchange</button>
      </div>
    )
  }
}
