import {create} from "zustand/esm";

export interface NotificationController {
    isModalOpen: boolean,
    closeModal: () => void,
    openModal: () => void,
}

const init_state = {
    isModalOpen: false
}

export const useNotificationStore = create<NotificationController>((set) => ({
    ...init_state,
    closeModal: () => {
        set(state => ({
            ...state,
            isModalOpen: false
        }))
    },
    openModal: () => {
        set(state => ({
            ...state,
            isModalOpen: true
        }))
    }
}))
