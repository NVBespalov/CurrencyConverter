import pt from 'prop-types'

export const defaultProps = {
  currency: 'EUR',
  amount: 0,
  balance: 0,
  rate: 0,
  base: 'USD'
}
export const propTypes = {
  currency: pt.string,
  balance: pt.number,
  amount: pt.number,
  rate: pt.number,
  base: pt.number
}
