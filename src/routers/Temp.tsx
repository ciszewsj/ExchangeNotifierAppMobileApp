import {FC, useEffect, useMemo, useState} from "react";
import {auth, firestore} from "../firebase/firebase";
import {ApplicationRouter} from "./ApplicationRouter";
import {AuthenticationRouter} from "./AuthenticationRouter";
import {doc, onSnapshot} from "firebase/firestore";
import {useAddCurrenciesStore} from "../store/addCurrenciesStore";
import {useHomePageStore} from "../store/homePageStore";
import {UserSettings} from "../firebase/UserSettings";
import {useAddNotificationStore} from "../store/notificationSettingsStore";

export const Temp: FC<{}> = () => {

    const [isLogged, setIsLogged] = useState(false)

    const updatePossibleOptions = useAddCurrenciesStore().updatePossibleOptions
    const updateUserNotifications = useHomePageStore().updateUserNotifications
    const updateSettings = useAddNotificationStore().updateSettings

    const settingsListener = useMemo(() => {
        if (!auth.currentUser) {
            return null
        }
        let uid = auth.currentUser.uid
        const documentRef = doc(firestore, 'USERS_SETTINGS', uid);
        return onSnapshot(documentRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data() as UserSettings;
                updateUserNotifications(data.notification_settings)
                updateSettings(data.notification_settings)
            } else {
            }
        });
    }, [isLogged, firestore])

    const listener = useMemo(() => {
        const documentRef = doc(firestore, 'SETTINGS', 'CURRENCIES');
        return onSnapshot(documentRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                updatePossibleOptions(data.currenciesList)
            } else {
            }
        });
    }, [firestore]);
    useEffect(() => {
        if (isLogged) {
            const unsubscribe = listener
            return () => {
                unsubscribe();
            };
        }
    }, [listener, isLogged])
    useEffect(() => {
        if (isLogged) {
            const unsubscribe = settingsListener
            if (!unsubscribe) {
                return
            }
            return () => {
                unsubscribe();
            };
        }
    }, [settingsListener, isLogged])

    auth.onAuthStateChanged(state => {
        if (state?.refreshToken != null) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    })

    if (isLogged) {
        return <ApplicationRouter/>
    } else {
        return <AuthenticationRouter/>
    }
}
