const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  SAR: 3.75,
  JPY: 149.50,
  CAD: 1.35,
  AUD: 1.52,
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  const fromRate = CURRENCY_RATES[fromCurrency] || 1
  const toRate = CURRENCY_RATES[toCurrency] || 1
  
  // Convert to USD first, then to target currency
  const inUSD = amount / fromRate
  return inUSD * toRate
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    AED: 'د.إ',
    SAR: 'ر.س',
    JPY: '¥',
    CAD: 'CA$',
    AUD: 'A$',
  }
  return symbols[currency] || currency
}

export async function detectCurrencyFromIP(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    const currencyMap: Record<string, string> = {
      US: 'USD',
      GB: 'GBP',
      AE: 'AED',
      SA: 'SAR',
      JP: 'JPY',
      CA: 'CAD',
      AU: 'AUD',
      // Add more European countries
      DE: 'EUR',
      FR: 'EUR',
      IT: 'EUR',
      ES: 'EUR',
    }
    return currencyMap[data.country_code] || 'USD'
  } catch (error) {
    return 'USD'
  }
}

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
]
