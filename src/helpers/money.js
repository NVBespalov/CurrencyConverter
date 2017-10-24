
  /**
   * convertTo amount
   * @param amount - The amount to convert
   * @param rate - - The rate to convert
   */
  export const convertTo = (amount, rate) => Math.round((amount * rate) * 100) / 100
  export const convertFrom = (amount, rate) => Math.round((amount / rate) * 100) / 100
