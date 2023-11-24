import {create} from "zustand";
import firebase from "firebase/compat";
import Auth = firebase.auth.Auth;

interface SettingsController {
    style?: "light" | "dark",
    changeStyle: () => void,
    logout: (auth: any) => void
}

const initial_state = {
    style: "light",
}

export const useSettingsStore = create<SettingsController>((set) => ({
    ...initial_state,
    changeStyle: () => {
        let newStyle = useSettingsStore.getState().style === "light" ? "dark" : "light"
        set((state) => ({...state, style: newStyle}))
    },
    logout: (auth: Auth) => {
        if (auth.currentUser != null) {
            auth.signOut().catch(e => console.log(e))
        }
    }

}))
