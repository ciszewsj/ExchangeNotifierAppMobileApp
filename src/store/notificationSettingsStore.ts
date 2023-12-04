import {create} from "zustand/esm";
import {NotificationSettingEntity, UserSettings} from "../firebase/UserSettings";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {Auth} from "@firebase/auth";
import {Firestore} from "@firebase/firestore";


interface NotificationSettings {
    settings: NotificationSettingEntity | null,
    deleteData: {
        isProcessing: boolean
    },
    setSettings: (settings: NotificationSettingEntity) => void,
    updateSettings: (settings: NotificationSettingEntity[]) => void,
    deleteNotificationSettings: (firestore: any, auth: any, navigation: any) => void,
    changeStatusOfAllNotification: (auth: Auth, firestore: Firestore) => void

}

const init_state = {
    settings: null,
    deleteData: {
        isProcessing: false
    }
}

export const useAddNotificationStore = create<NotificationSettings>((set) => ({
    ...init_state,
    setSettings: (settings) => {
        console.log("Setted is ", settings)
        set(state => ({
            ...state,
            settings: settings
        }))
    },
    deleteNotificationSettings: (firestore, auth, navigation) => {
        if (auth.currentUser
            && useAddNotificationStore.getState().settings != null
            && useAddNotificationStore.getState().settings!.currencySymbol != null
            && useAddNotificationStore.getState().settings!.secondCurrencySymbol != null) {

            let mainSymbol = useAddNotificationStore.getState().settings!.currencySymbol
            let secondSymbol = useAddNotificationStore.getState().settings!.secondCurrencySymbol
            let uid = auth.currentUser.uid

            const docRef = doc(firestore, "USERS_SETTINGS", uid)

            getDoc(docRef)
                .then(async (snapshot) => {
                    set(state => ({
                        ...state,
                        deleteData: {
                            ...init_state.deleteData,
                            isProcessing: true
                        }
                    }))
                    if (snapshot.exists()) {
                        const docData = snapshot.data() as UserSettings;
                        docData.notification_settings = docData.notification_settings.filter(notif => !(notif.currencySymbol === mainSymbol && notif.secondCurrencySymbol === secondSymbol))
                        await setDoc(docRef, {...docData})
                        navigation.navigate("Home")
                        set(state => ({
                            ...state,
                            deleteData: {
                                ...init_state.deleteData,
                                isProcessing: false
                            }
                        }))
                    } else {
                        set(state => ({
                            ...state,
                            deleteData: {
                                ...init_state.deleteData,
                                isProcessing: false
                            }
                        }))
                    }
                })
                .catch((error) => {
                    console.error('Błąd podczas przetwarzania dokumentu:', error);
                    set(state => ({
                        ...state,
                        deleteData: {
                            ...init_state.deleteData,
                            isProcessing: false
                        }
                    }))
                });
        }
    },
    updateSettings: (settings: NotificationSettingEntity[]) => {
        const current = useAddNotificationStore.getState().settings
        if (current != null) {
            const found = settings.findIndex(value => value.currencySymbol === current.currencySymbol
                && value.secondCurrencySymbol === current.secondCurrencySymbol)
            if (settings.hasOwnProperty(found)) {
                set(state => ({
                    ...state,
                    settings: settings[found]
                }))
            }
        }
    },
    changeStatusOfAllNotification: (auth, firestore) => {
        if (auth.currentUser
            && useAddNotificationStore.getState().settings != null
            && useAddNotificationStore.getState().settings!.currencySymbol != null
            && useAddNotificationStore.getState().settings!.secondCurrencySymbol != null) {
            let uid = auth.currentUser.uid
            const docRef = doc(firestore, "USERS_SETTINGS", uid)
            let mainSymbol = useAddNotificationStore.getState().settings!.currencySymbol
            let secondSymbol = useAddNotificationStore.getState().settings!.secondCurrencySymbol
            getDoc(docRef)
                .then(async (snapshot) => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data() as UserSettings;
                        docData.notification_settings = docData.notification_settings.map(notif => {
                            if (notif.currencySymbol === mainSymbol && notif.secondCurrencySymbol === secondSymbol) {
                                notif.enabled = notif.enabled != undefined ? !notif.enabled : true
                            }
                            return notif
                        })
                        console.log("docData", docData)
                        await setDoc(docRef, {...docData})
                        set(state => ({
                            ...state,
                            deleteData: {
                                ...init_state.deleteData,
                                isProcessing: false
                            }
                        }))
                    }
                })
                .catch((e) => {
                })
        }
    }
}))
