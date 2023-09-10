export function formatCurrency(
  amount: number,
  currencyCode: string = 'BRL'
): string {
  const formattedCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)

  return formattedCurrency
}
