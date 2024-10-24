//retorna data no formato brasileiro e string
export const dateToStrBr = (date: Date) => {
  return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

//verifica se o formato da data é yyyy-mm-dd hh:mm
export const isValidDateTimeFormat = (dateTimeString: string): boolean => {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
  return dateTimeRegex.test(dateTimeString)
}
