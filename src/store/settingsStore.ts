import {create} from "zustand";
import firebase from "firebase/compat";
import Auth = firebase.auth.Auth;
import AsyncStorage from '@react-native-async-storage/async-storage';


interface SettingsController {
    data: {
        style?: "light" | "dark",
        notification: []
    }
    changeStyle: () => void,
    logout: (auth: any) => void,
    init: () => void
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

}))
