import React, { PureComponent } from 'react'
import styles from './NavBar.styl'

export default class extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }
}
