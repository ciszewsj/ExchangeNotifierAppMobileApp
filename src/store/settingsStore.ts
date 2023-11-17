import {create} from "zustand";

interface SettingsController {
    style?: "light" | "dark"

    changeStyle: () => void
}

export const useSettingsStore = create<SettingsController>((set) => ({
    style: "light",
    changeStyle: () => {
        let newStyle = useSettingsStore.getState().style === "light" ? "dark" : "light"
        set((state) => ({...state, style: newStyle}))
    }
}))
