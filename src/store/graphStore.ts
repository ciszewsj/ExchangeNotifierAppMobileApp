import {create} from "zustand";
import {ExchangeRateEntity} from "../firebase/ExchangeRate";
import {itemType} from "react-native-gifted-charts/src/LineChart/types";

type ConvertDataOptions = "MONTH" | "DAY" | "HOUR"

export interface GraphController {
    data: {
        input?: ExchangeRateEntity | null,
        converted: itemType[],
        type: ConvertDataOptions
    }
    setInput: (input: ExchangeRateEntity) => void,
    convertData: (type: ConvertDataOptions | undefined) => void

}

const init_data = {
    data: {
        input: null,
        converted: [{value: 0, label: 0}],
        type: "DAY"
    }
}

export const useGraphStore = create<GraphController>((set) => ({
    ...init_data,
    setInput: input => {
        set(state => ({
            ...state,
            data: {
                ...state.data,
                input: input
            }
        }))
        console.log(input)
        if (input != null) {
            useGraphStore.getState().convertData(undefined)
        }
    },
    convertData: type => {
        let items: itemType[] | undefined = undefined
        const rates = useGraphStore.getState().data.input?.document.exchangeRates
        if (rates != undefined && rates?.length > 0
        ) {
            items = rates.map(
                rate => {
                    return {
                        value: rate.rate,
                        label: rate.date.toString()
                    }
                }
            )
        }
        set(state => ({
            ...state,

            type: type,
            data: {
                ...state.data,
                converted: items == undefined ? init_data.data.input : items
            }
        }))
    }
}))
