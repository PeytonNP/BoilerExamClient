/**
 * @return {string}
 */
export function IndexToLetter (index) {
  return String.fromCharCode(65 + index)
}

/**
 * @return {string}
 */
export function IndexToRoman (index) {
  if (isNaN(index)) { return NaN }

  const digits = String(+index).split('')
  const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
    '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  let roman = ''
  let i = 3
  while (i--) { roman = (key[+digits.pop() + (i * 10)] || '') + roman }
  return Array(+digits.join('') + 1).join('M') + roman
}
