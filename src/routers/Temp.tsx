import {FC, useEffect, useMemo, useState} from "react";
import {auth, firestore} from "../firebase/firebase";
import {onSnapshot, doc} from "firebase/firestore"
import {ApplicationRouter} from "./ApplicationRouter";
import {AuthenticationRouter} from "./AuthenticationRouter";
import {Unsubscribe} from "@firebase/firestore";

export const Temp: FC<{}> = () => {

    const [isLogged, setIsLogged] = useState(false)


    const snapshotListener: Unsubscribe = useMemo(() => {
        const documentRef = doc(firestore, 'messages', 'VAEm3n44gAYzVbVskrQX');

        return onSnapshot(documentRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                console.log('Aktualne dane:', data);
            } else {
                console.log('Dokument nie istnieje');
            }
        });
    }, [firestore]);

    useEffect(() => {
        const unsubscribe = snapshotListener;
        return () => {
            unsubscribe();
        };
    }, [snapshotListener]);

    useEffect(() => {

    }, [auth])

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
