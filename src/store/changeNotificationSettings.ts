import {
    NotificationSettingEntity,
    NotificationTypeEntity,
    UserSettings
} from "../firebase/UserSettings";
import {create} from "zustand/esm";
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {Firestore} from "@firebase/firestore";
import {Auth} from "@firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {USER_SETTINGS} from "../firebase/firebase";
import {useAddNotificationStore} from "./notificationSettingsStore";

export interface ChangeNotificationController {
    notificationData?: NotificationSettingEntity | undefined,
    eventEdit: {
        uuid?: string | undefined,
        type_name?: "TIME" | "PERCENT" | "VALUE",
        hour?: number,
        minute?: number,
        value?: number,
        percent?: number,
        type?: "LOWER" | "HIGHER",
        notificationType?: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE"
    },
    eventCreate: {
        type_name?: "TIME" | "PERCENT" | "VALUE",
        hour?: number,
        minute?: number,
        value?: number,
        percent?: number,
        type?: "LOWER" | "HIGHER",
        notificationType?: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE",
        period?: "HOUR" | "DAY" | "WEEK" | "MONTH"
    },
    setNotificationData: (data: NotificationSettingEntity | null) => void,
    changeCreateNotificationType: (type_name?: "TIME" | "PERCENT" | "VALUE",
                                   hour?: number,
                                   minute?: number,
                                   value?: number,
                                   percent?: number,
                                   type?: "LOWER" | "HIGHER",
                                   notificationType?: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE",
                                   period?: "HOUR" | "DAY" | "WEEK" | "MONTH"
    ) => void,
    addNotification: (auth: Auth, firestore: Firestore, back: () => void) => void
}

const init_state = {
    notificationData: undefined,
    eventEdit: {
        uuid: undefined,
        percent: 0.0,
        hour: 0,
        minute: 0,
        value: 0.0,
    },
    eventCreate: {
        value: 0.0,
        percent: 0.0,
        hour: 0,
        minute: 0
    }
};

export const useChangeNotificationStore = create<ChangeNotificationController>((set) => ({
    ...init_state,
    setNotificationData: (data) => {
        set(state => ({
            ...state,
            notificationData: data != null ? data : undefined
        }))
    },
    addNotification: (auth: Auth, firestore: Firestore, back: () => void) => {
        const notification: NotificationTypeEntity = {
            uuid: uuid(),
            type_name: "VALUE",
            enabled: false,
            options: {
                value: 4.2,
                type: "LOWER",
                notificationType: "VALUE_TYPE"
            }
        }
        if (auth.currentUser != null) {
            const document = doc(firestore, USER_SETTINGS, auth.currentUser.uid)

            getDoc(document).then(
                async doc => {
                    if (doc.exists()) {
                        let data = doc.data() as UserSettings

                        const isIn = data.notification_settings.findIndex(value =>
                            value.currencySymbol === useChangeNotificationStore.getState().notificationData?.currencySymbol &&
                            value.secondCurrencySymbol === useChangeNotificationStore.getState().notificationData?.secondCurrencySymbol)

                        let val: NotificationSettingEntity | undefined = undefined
                        if (data.notification_settings.hasOwnProperty(isIn)) {
                            data.notification_settings[isIn].notificationTypes.push(notification)
                            val = data.notification_settings[isIn]
                        } else {
                            if (useChangeNotificationStore.getState().notificationData?.currencySymbol != null
                                && useChangeNotificationStore.getState().notificationData?.secondCurrencySymbol != null) {
                                val = {
                                    currencySymbol: useChangeNotificationStore.getState().notificationData!.currencySymbol,
                                    secondCurrencySymbol: useChangeNotificationStore.getState().notificationData!.secondCurrencySymbol,
                                    notificationTypes: [notification]
                                }
                                data.notification_settings.push(val)
                            }
                        }
                        await setDoc(document, {...data}).catch(e => console.log(e))
                        if (val != undefined) {
                            back()
                            useAddNotificationStore().setSettings({
                                currencySymbol: val.currencySymbol,
                                secondCurrencySymbol: val.secondCurrencySymbol,
                                notificationTypes: val.notificationTypes
                            })
                        }
                    }
                }
            ).catch(() => {
            })
        }
    },
    changeCreateNotificationType: (type_name, hour, minute, value, percent, type, notificationType, period) => {
        set(state => ({
            ...state,
            eventCreate: {
                type_name: type_name,
                hour: hour,
                minute: minute,
                value: value,
                percent: percent,
                type: type,
                notificationType: notificationType,
                period: period
            }
        }))
    }
}))
