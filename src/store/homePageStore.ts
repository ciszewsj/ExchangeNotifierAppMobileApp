import {create} from "zustand/esm";
import {NotificationSettingEntity, NotificationTypeEntity} from "../firebase/UserSettings";
import {ExchangeRate, ExchangeRateDocument, ExchangeRateEntity} from "../firebase/ExchangeRate";

interface HomePageController {
    currencies: CurrencySettings[]
    updateUserNotifications: (entities: NotificationSettingEntity[]) => void,
    updateCurrencyValues: (entity: ExchangeRateEntity) => void

}

export type CurrencySettings = {
    mainCurrency: string,
    secondaryCurrency: string
    notification_settings: NotificationTypeEntity[],
    current_values: ExchangeRate[],
}

const initial_state = {
    currencies: []

}

export const useHomePageStore = create<HomePageController>((set) => ({
        ...initial_state,
        updateUserNotifications: (entities) => {
            const oldCurrencies = [...useHomePageStore.getState().currencies]
            const newCurrencies = []
            for (let key in entities) {
                if (entities.hasOwnProperty(key)) {
                    const entity = entities[key];
                    const foundIndex = oldCurrencies.findIndex(currency => currency.mainCurrency === entity.currencySymbol && currency.secondaryCurrency === entity.secondCurrencySymbol);
                    if (foundIndex != -1) {
                        newCurrencies[foundIndex] = {
                            ...newCurrencies[foundIndex],
                            notification_settings: entity.notificationTypes,
                        }
                    } else {
                        newCurrencies.push({
                            mainCurrency: entity.currencySymbol,
                            secondaryCurrency: entity.secondCurrencySymbol,
                            notification_settings: entity.notificationTypes,
                            current_values: [],
                        })
                    }
                }
            }
            set(state => ({
                ...state,
                currencies: [...newCurrencies]
            }))
        },
        updateCurrencyValues: (entity: ExchangeRateEntity) => {
            const currencies = [...useHomePageStore.getState().currencies]
            for (let key in currencies) {
                if (currencies.hasOwnProperty(key) && currencies[key].mainCurrency === entity.mainCurrency && currencies[key].secondaryCurrency === entity.secondCurrency) {
                    currencies[key].current_values = entity.document.exchangeRates
                    break
                }
            }
            set(state => ({
                ...state,
                currencies: [...currencies]
            }))
        }
    })
)
