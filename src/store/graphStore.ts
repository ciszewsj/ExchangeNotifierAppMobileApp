import {create} from "zustand";
import {ExchangeRateEntity} from "../firebase/ExchangeRate";
import {itemType} from "react-native-gifted-charts/src/LineChart/types";

export type ConvertDataOptions = "MONTH" | "DAY" | "HOUR"

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
        type: "HOUR"
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
        if (type == undefined) {
            type = useGraphStore.getState().data.type
        }
        let items: itemType[] | undefined = undefined
        const rates = useGraphStore.getState().data.input?.document.exchangeRates

        if (rates != undefined && rates?.length > 0
        ) {
            let converted_rates = rates.map(
                rate => {
                    const milliseconds = rate.date.seconds * 1000 + Math.floor(rate.date.nanoseconds / 1000000);
                    const d = new Date(milliseconds);
                    return {
                        rate: rate.rate,
                        date: d
                    }
                }
            )

            function getTime(): number {
                switch (type) {
                    case "MONTH":
                        return 365 * 24 * 60 * 60 * 1000;
                    case "DAY":
                        return 31 * 24 * 60 * 60 * 1000;
                    case "HOUR":
                        return 24 * 60 * 60 * 1000;
                    default:
                        return 0;
                }
            }


            converted_rates = converted_rates.filter(s => {
                return s.date.getTime() >= new Date().getTime() - getTime()
            }).sort((a, b) => a.date - b.date)
            let options: Intl.DateTimeFormatOptions

            switch (type) {
                case "HOUR":
                    options = {
                        hour: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    };
                    break;
                case "DAY":
                    options = {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    };
                    break
                case "MONTH":
                default:
                    options = {
                        month: '2-digit',
                        year: 'numeric'
                    };
            }

            let all_x_values = []
            let act = converted_rates.length > 0 ? converted_rates.map(value => value.date).reduce((minDate, currentDate) => {
                return currentDate < minDate ? currentDate : minDate;
            }) : null;
            let max = converted_rates.length > 0 ? converted_rates.map(value => value.date).reduce((minDate, currentDate) => {
                return currentDate > minDate ? currentDate : minDate;
            }) : null;

            if (act != null) {
                do {
                    all_x_values.push(act.toLocaleDateString('en-US', options))
                    switch (type) {
                        case "HOUR":
                            act.setHours(act.getHours() + 1)
                            break
                        case "DAY":
                            act.setDate(act.getDate() + 1)
                            break
                        default:
                            act.setMonth(act.getMonth() + 1)
                    }
                } while (act < max)
            }
            const new_converted_rates = converted_rates.map(rate => {
                return {
                    rate: rate.rate,
                    date: rate.date.toLocaleString('en-US', options)
                }
            })

            items = []

            let last_val = 0
            for (let x in all_x_values) {
                const label = all_x_values[x]
                const el = new_converted_rates.filter(rate => rate.date === label).map(rate => rate.rate)
                let avg
                if (el.length === 0) {
                    avg = last_val
                } else {
                    avg = el.reduce((a, b) => a + b, 0) / el.length || 0

                }
                try {
                    avg = avg.toFixed(4)
                } catch (e) {
                    console.log("ERROR", e)
                }
                items.push(
                    {
                        value: avg,
                        label: label,
                        dataPointText: el.length != 0 ? avg : undefined
                    }
                )
                last_val = avg
            }
        }

        set(state => ({
            ...state,

            type: type,
            data: {
                ...state.data,
                type: type,
                converted: items == undefined || items.length < 1 ? init_data.data.input : items
            }
        }))
    }
}))
