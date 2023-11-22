import {create} from "zustand/esm";
import {Auth} from "@firebase/auth";
import {UserSettings} from "../firebase/UserSettings";
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

export const useAddNotificationStore = create<AddNotificationController>((set) => ({
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
        if (auth.currentUser && useAddNotificationStore.getState().currentMainCurrency != null && useAddNotificationStore.getState().currentSecondaryCurrency != null) {
            let mainSymbol = useAddNotificationStore.getState().currentMainCurrency!.symbol
            let secondSymbol = useAddNotificationStore.getState().currentSecondaryCurrency!.symbol
            let uid = auth.currentUser.uid
            const docRef = doc(firestore, "USERS_SETTINGS", uid)
            getDoc(docRef)
                .then(async (snapshot) => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data() as UserSettings;
                        docData.notification_settings.push({
                            currencySymbol: mainSymbol,
                            secondCurrencySymbol: secondSymbol,
                            notificationTypes: []
                        })
                        await setDoc(docRef, {...docData});
                    } else {
                        const newDocData: UserSettings = {device_settings: [], notification_settings: []};
                        newDocData.notification_settings.push({
                            currencySymbol: mainSymbol,
                            secondCurrencySymbol: secondSymbol,
                            notificationTypes: []
                        })
                        await setDoc(docRef, newDocData);
                    }
                    alert("ADDED?")
                })
                .catch((error) => {
                    console.error('Błąd podczas sprawdzania dokumentu:', error);
                });
        }
    }
}))