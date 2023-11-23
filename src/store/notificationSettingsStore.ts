import {create} from "zustand/esm";
import {NotificationSettingEntity, UserSettings} from "../firebase/UserSettings";
import {doc, getDoc, setDoc} from "firebase/firestore";

interface NotificationSettings {
    settings: NotificationSettingEntity | null,
    deleteData: {
        isProcessing: boolean
    },
    setSettings: (settings: NotificationSettingEntity) => void
    deleteNotificationSettings: (firestore: any, auth: any, navigation: any) => void
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
                        settings: {
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
                            settings: {
                                ...init_state.deleteData,
                                isProcessing: false
                            }
                        }))
                    } else {
                        set(state => ({
                            ...state,
                            settings: {
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
                        settings: {
                            ...init_state.deleteData,
                            isProcessing: false
                        }
                    }))
                });
        }
    }
}))
