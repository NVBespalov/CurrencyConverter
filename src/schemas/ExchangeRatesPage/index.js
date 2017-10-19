import pt from 'prop-types'

export default {
  defaultProps: {
    base: 'USD',
    pairs: {},
    rates: {},
    currencies: {}
  },
  propTypes: {
    base: pt.string,
    pairs: pt.shape({}),
    rates: pt.shape({}),
    currencies: pt.shape({})
  }
}
