import {create} from "zustand/esm";

interface ConvertCurrenciesController {
    data: {
        exchangeRate: number,
        mainCurrency: string,
        secondaryCurrency: string,
    }
    convertFromMainCurrency: (currency: string) => void
    convertFromSecondaryCurrency: (currency: string) => void
    setConverterValue: (value: number | null) => void
}

const initial_state = {
    exchangeRate: 0,
    mainCurrency: "1.00",
    secondaryCurrency: "0.00"

}

export const useConverterStore = create<ConvertCurrenciesController>((set) => ({
    data: {...initial_state},
    convertFromMainCurrency: (currency: string) => {
        let curr: number = parseFloat(currency.replace(",", "."))
        if (isNaN(curr)) {
            curr = 0.00
        }
        set(state => ({
            ...state,
            data: {
                ...state.data,
                mainCurrency: curr.toFixed(2),
                secondaryCurrency: (curr * state.data.exchangeRate).toFixed(2)
            }
        }))
    },
    convertFromSecondaryCurrency: (currency: string) => {
        let curr: number = parseFloat(currency.replace(",", "."))
        if (isNaN(curr)) {
            curr = 0.00
        }
        set(state => ({
            ...state,
            data: {
                ...state.data,
                secondaryCurrency: curr.toFixed(2),
                mainCurrency: (curr / state.data.exchangeRate).toFixed(2)
            }
        }))
    },
    setConverterValue: (value: number | null) => {
        let curr: number = parseFloat(useConverterStore.getState().data.mainCurrency.replace(",", "."))
        set(state => ({
                ...state,
                data: {
                    ...state.data,
                    exchangeRate: value ? value : 0,
                    secondaryCurrency: (curr * value).toFixed(2)
                }
            })
        )

    }
}))

