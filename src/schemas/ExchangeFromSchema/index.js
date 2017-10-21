import pt from 'prop-types'

export const defaultProps = {
  currency: 'EUR',
  amount: 0,
  balance: 0
}
export const propTypes = {
  currency: pt.string,
  balance: pt.number,
  amount: pt.number
}
