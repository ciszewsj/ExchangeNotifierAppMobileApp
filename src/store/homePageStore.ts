import {create} from "zustand/esm";
import {NotificationSettingEntity} from "../firebase/UserSettings";

interface HomePageController {
    notification_settings: NotificationSettingEntity[],
    updateUserNotifications: (entities: NotificationSettingEntity[]) => void

}

const initial_state = {
    notification_settings: []
}

export const useHomePageStore = create<HomePageController>((set) => ({
    ...initial_state,
    updateUserNotifications: (entities) => {
        // console
        set(state => ({
            ...state,
            notification_settings: entities
        }))
    }

}))
