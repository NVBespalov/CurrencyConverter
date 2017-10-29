import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { pathOr } from 'ramda'
import { propTypes, defaultProps } from 'schemas/ExchangeFromSchema'
import AccountBalance from 'components/AccountBalance'
import cx from 'classnames'
import styles from './ExchangeFrom.styl'
import baseStyles from 'styles/base.styl'

export default class extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    xDown: null,
    yDown: null
  }
  normalizeFieldValue = value => (this.props.balance < parseInt(value, 10) ? this.props.balance : value)
  handleTouchStart = ({ touches }) => {
    this.setState(() => ({
      xDown: pathOr(null, ['0', 'clientX'], touches),
      yDown: pathOr(null, ['0', 'clientY'], touches)
    }))

  }
  handleTouchMove = ({ touches }) => {
    const xDown = this.state.xDown
    const yDown = this.state.yDown
    if ( ! xDown || ! yDown ) {
      return;
    }

    const xUp =  pathOr(null, ['0', 'clientX'], touches)
    const yUp = pathOr(null, ['0', 'clientY'], touches)

    const xDiff = xDown - xUp
    const yDiff = yDown - yUp

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if ( xDiff > 0 ) {
        /* left swipe */
        debugger
      } else {
        /* right swipe */
        debugger
      }
    } else {
      if ( yDiff > 0 ) {
        /* up swipe */
        debugger
      } else {
        /* down swipe */
        debugger
      }
    }

    this.setState(() => ({
      xDown: null,
      yDown: null
    }))
  }

  render() {
    return (
      <div
        className={cx(baseStyles.container, styles.container)}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
      >
        <div className={styles.leftColumn}>
          <AccountBalance currency={this.props.currency} balance={this.props.balance} />
        </div>
        <div className={styles.rightColumn}>
          {this.props.amount > 0 && '-'}
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
        <div className={styles.navigation}>
          <div className={styles.navigationWrapper}>
            <div className={cx(baseStyles.circle, baseStyles.white, styles.navigationBullet)} />
            <div className={cx(baseStyles.circle, baseStyles.white, styles.navigationBullet)} />
            <div className={cx(baseStyles.circle, baseStyles.white, styles.navigationBullet)} />
          </div>
        </div>
      </div>
    )
  }
}
