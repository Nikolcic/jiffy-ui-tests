/**
 * Parses a currency-formatted string and converts it into a number
 * Removes currency symbols and any non-numeric characters (except dot, comma, and minus sign)
 * Handles both dot and comma as decimal separators
 * Throws an error if the result is not a valid number
 **/
export const parsePrice = (priceString: string): number => {
  console.log(`parsePrice() - ${priceString}`)
  const cleaned = priceString.replace(/[^\d.,-]/g, "").replace(",", ".")
  const number = parseFloat(cleaned)
  if (isNaN(number)) throw new Error(`Invalid price string: "${priceString}"`)
  return number
}

/**
 * Generates a random string of alphabetic characters (uppercase and lowercase) with the specified length
 * @param length - Number of characters to generate
 * @returns A randomly generated string of the specified length
 */
export const getRandomChars = (length: number): String => {
  console.log("getRandomChars()")
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkl"
  let result = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}

/**
 * 
 * @returns Generates a random 5-digit number string, typically used to simulate ZIP/postal codes
 */
export const getFiveRandomZipDigits = (): string => {
  console.log("getFiveRandomZipDigits()")
  return Math.floor(10000 + Math.random() * 90000).toString()
}
