import {FC, useState} from "react";
import {View} from "react-native";
import {auth} from "../firebase/firebase";
import {ApplicationRouter} from "./ApplicationRouter";
import {AuthenticationRouter} from "./AuthenticationRouter";

export const Temp: FC<{}> = () => {

    const [isLogged, setIsLogged] = useState(false)

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
