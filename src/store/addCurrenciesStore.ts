import {create} from "zustand/esm";

export interface AddNotificationController {
    possibleMainCurrencies: [string],
    possibleSecondaryCurrencies: [string],
    currentMainCurrency?: string | null,
    currentSecondaryCurrency?: string | null,
    createCurrencyExchangeRate: (firstCurrency, secondaryCurrency) => void,
    changeMainCurrency: (currency: string) => void,
    changeSecondaryCurrency: (currency: string) => void,

}

const init_state = {
    possibleMainCurrencies: ["USD", "EUR", "PLN"],
    possibleSecondaryCurrencies: ["USD", "EUR", "PLN", "DEN", "SWG"],
    currentMainCurrency: null,
    currentSecondaryCurrency: null
}

export const useAddNotificationStore = create<AddNotificationController>((set) => ({
    ...init_state,
    createCurrencyExchangeRate: (firstCurrency, secondaryCurrency) => {
        console.log(firstCurrency, secondaryCurrency)
    },
    changeMainCurrency: (currency: string) => {

    },
    changeSecondaryCurrency: (currency: string) => {

    },
}))
