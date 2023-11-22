import {FC, useEffect, useMemo, useState} from "react";
import {auth, firestore} from "../firebase/firebase";
import {ApplicationRouter} from "./ApplicationRouter";
import {AuthenticationRouter} from "./AuthenticationRouter";
import {doc, onSnapshot} from "firebase/firestore";
import {useAddNotificationStore} from "../store/addCurrenciesStore";

export const Temp: FC<{}> = () => {

    const [isLogged, setIsLogged] = useState(false)

    const updatePossibleOptions = useAddNotificationStore().updatePossibleOptions

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
