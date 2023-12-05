import {create} from "zustand";
import {ExchangeRateEntity} from "../firebase/ExchangeRate";

type ConvertDataOptions = "MONTH" | "DAY" | "HOUR"


export interface GraphController {
    data: {
        input?: ExchangeRateEntity | null,
        converted: {
            x: string[],
            y: string[]
        },
        type: ConvertDataOptions
    }
    setInput: (input: ExchangeRateEntity) => void,
    convertData: (type: ConvertDataOptions | undefined) => void

}

const init_data = {
    data: {
        input: null,
        converted: {
            x: [],
            y: []
        },
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
        if (input != null) {
            useGraphStore.getState().convertData(undefined)
        }
    },
    convertData: type => {

    }
}))
