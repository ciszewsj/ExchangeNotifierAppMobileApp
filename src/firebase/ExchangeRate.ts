export type ExchangeRateEntity = {
    mainCurrency: string,
    secondCurrency: string,
    document: ExchangeRateDocument
}

export type ExchangeRateDocument = {
    exchangeRates: ExchangeRate[]
}

export type ExchangeRate = {
    date: Date,
    rate: number
}
