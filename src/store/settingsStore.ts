import {create} from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Firestore} from "@firebase/firestore";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {UserSettings} from "../firebase/UserSettings";
import {Auth} from "@firebase/auth";


interface SettingsController {
    data: {
        style?: "light" | "dark",
        notifications: [],
        token: "string" | undefined,
        isNotificationEnable: boolean
    }
    changeStyle: () => void,
    logout: (auth: any) => void,
    init: () => void,
    setToken: (token: string, auth: Auth, firestore: Firestore) => void,
    changeNotificationStatus: () => void,
    addNotification: () => void

}

const initial_state = {
    style: "light",
}

export const useSettingsStore = create<SettingsController>((set) => ({
    data: {...initial_state},
    changeStyle: () => {
        let newStyle = useSettingsStore.getState().data.style === "light" ? "dark" : "light"
        set((state) => ({...state, data: {...state.data, style: newStyle}}))
    },
    logout: (auth: Auth) => {
        if (auth.currentUser != null) {
            auth.signOut().catch(() => {
            })
        }
    },
    init: async () => {
        let style: string | null = await AsyncStorage.getItem("style")
    },
    setToken: (token, auth, firestore) => {
        console.log("TOKEN ?>????")
        if (auth.currentUser != null) {
            let uid = auth.currentUser.uid
            const docRef = doc(firestore, "USERS_SETTINGS", uid)

            console.log("?@?")
            getDoc(docRef).then(
                async snapshot => {
                    if (snapshot.exists()) {
                        const data = snapshot.data() as UserSettings
                        const existing = data.device_settings.find(value => value.device_token === token)
                        if (existing == null) {
                            data.device_settings.push({
                                device_token: token,
                                update_time: new Date()
                            })
                            console.log("DAtA", {...data})
                            await setDoc(docRef, {...data})
                        }

                    }
                }
            ).catch(e => console.log(e))
        }
    }

}))
