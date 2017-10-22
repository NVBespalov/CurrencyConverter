import pt from 'prop-types'

export default {
  defaultProps: {
    base: 'USD',
    pairs: {},
    rates: {},
    accounts: {},
    currencies: []
  },
  propTypes: {
    base: pt.string,
    pairs: pt.shape({}),
    rates: pt.shape({}),
    currencies: pt.arrayOf(pt.string),
    accounts: pt.shape({})
  }
}
