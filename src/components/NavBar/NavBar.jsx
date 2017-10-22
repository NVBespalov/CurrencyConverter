import React, { PureComponent } from 'react'
import cx from 'classnames'
import baseStyles from 'styles/base.styl'
import styles from './NavBar.styl'

export default class extends PureComponent {
  render() {
    return (
      <div className={cx(baseStyles.container, styles.container)}>
        {this.props.children}
      </div>
    )
  }
}
