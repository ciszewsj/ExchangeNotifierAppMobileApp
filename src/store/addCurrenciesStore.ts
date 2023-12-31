import {create} from "zustand/esm";
import {NotificationSettingEntity, UserSettings} from "../firebase/UserSettings";
import {doc, getDoc, setDoc} from 'firebase/firestore';

export type CurrencyElement = {
    currency: string,
    main: boolean,
    symbol: string
}

export interface AddNotificationController {
    possibleMainCurrencies: CurrencyElement[],
    possibleSecondaryCurrencies: CurrencyElement[],
    isProcessing: boolean,
    isDataCorrect: boolean,
    currentMainCurrency?: CurrencyElement | null,
    currentSecondaryCurrency?: CurrencyElement | null,
    changeMainCurrency: (currency: CurrencyElement) => void,
    changeSecondaryCurrency: (currency: CurrencyElement) => void,
    updatePossibleOptions: (currencies: CurrencyElement[]) => void
    checkIsCorrect: (mainCurrency?: CurrencyElement | null, secondaryCurrency?: CurrencyElement | null) => boolean,
    createNewCurrencyConfig: (auth: any, firestore: any, navigate: any) => void
}

const init_state = {
    possibleMainCurrencies: [],
    isProcessing: false,
    isDataCorrect: false,
    possibleSecondaryCurrencies: [],
    currentMainCurrency: null,
    currentSecondaryCurrency: null,
}

export const useAddCurrenciesStore = create<AddNotificationController>((set) => ({
    ...init_state,
    changeMainCurrency: (currency: CurrencyElement) => {
        set(state => ({
            ...state,
            currentMainCurrency: currency,
            isDataCorrect: state.checkIsCorrect(currency, state.currentSecondaryCurrency)
        }))
    },
    changeSecondaryCurrency: (currency: CurrencyElement) => {
        set(state => ({
            ...state,
            currentSecondaryCurrency: currency,
            isDataCorrect: state.checkIsCorrect(state.currentMainCurrency, currency)
        }))
    },
    updatePossibleOptions: (currencies: CurrencyElement[]) => {
        const mainCurrencies = currencies.filter(curr => curr.main)
        set(state => ({
            ...state,
            possibleMainCurrencies: mainCurrencies,
            possibleSecondaryCurrencies: currencies
        }))
    },
    checkIsCorrect: (mainCurrency, secondaryCurrency) => {
        return mainCurrency != null && secondaryCurrency != null && mainCurrency !== secondaryCurrency && mainCurrency.main
    },
    createNewCurrencyConfig: (auth, firestore, navigate) => {


        if (auth.currentUser && useAddCurrenciesStore.getState().currentMainCurrency != null && useAddCurrenciesStore.getState().currentSecondaryCurrency != null) {
            let mainSymbol = useAddCurrenciesStore.getState().currentMainCurrency!.symbol
            let secondSymbol = useAddCurrenciesStore.getState().currentSecondaryCurrency!.symbol
            let uid = auth.currentUser.uid
            const docRef = doc(firestore, "USERS_SETTINGS", uid)
            set(state => ({
                ...state,
                isProcessing: true
            }))
            getDoc(docRef)
                .then(async (snapshot) => {
                    let data: NotificationSettingEntity | null
                    if (snapshot.exists()) {
                        const docData = snapshot.data() as UserSettings;

                        let val = docData.notification_settings.find(value => value.currencySymbol === mainSymbol &&
                            value.secondCurrencySymbol === secondSymbol)
                        if (val) {
                            navigate.navigate("EUR-USD", {
                                mainCurrency: val.currencySymbol,
                                secondaryCurrency: val.secondCurrencySymbol,
                                notification_settings: val.notificationTypes,
                                current_values: []
                            })
                            set(state => ({
                                ...state,
                                isProcessing: false,
                                currentSecondaryCurrency: null,
                                currentMainCurrency: null,
                                isDataCorrect: false
                            }))
                            return
                        }
                        data = {
                            currencySymbol: mainSymbol,
                            secondCurrencySymbol: secondSymbol,
                            notificationTypes: []
                        }
                        docData.notification_settings.push(data)
                        await setDoc(docRef, {...docData});
                    } else {
                        const newDocData: UserSettings = {device_settings: [], notification_settings: []};
                        data = {
                            currencySymbol: mainSymbol,
                            secondCurrencySymbol: secondSymbol,
                            notificationTypes: []
                        }
                        newDocData.notification_settings.push(data)
                        await setDoc(docRef, newDocData);
                    }
                    navigate.navigate("EUR-USD", {...data})
                    set(state => ({
                        ...state,
                        isProcessing: false,
                        currentSecondaryCurrency: null,
                        currentMainCurrency: null,
                        isDataCorrect: false
                    }))
                })
                .catch((error) => {
                    console.error('Błąd podczas sprawdzania dokumentu:', error);
                    set(state => ({
                        ...state,
                        isProcessing: false
                    }))
                });
        }
    }
}))
