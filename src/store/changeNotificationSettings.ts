import {
    NotificationSettingEntity,
    NotificationTypeEntity, PercentNotificationSettings, TimeNotificationSettings,
    UserSettings, ValueNotificationSettings
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
        notificationType?: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE",
        period?: "HOUR" | "DAY" | "WEEK" | "MONTH",
        isDataCorrect: boolean,
        isProcessing: boolean,
    },
    eventCreate: {
        type_name?: "TIME" | "PERCENT" | "VALUE",
        hour?: number,
        minute?: number,
        value?: number,
        percent?: number,
        type?: "LOWER" | "HIGHER",
        notificationType?: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE",
        period?: "HOUR" | "DAY" | "WEEK" | "MONTH",
        isDataCorrect: boolean,
        isProcessing: boolean,
    },
    setNotificationData: (data: NotificationSettingEntity | null) => void,
    setNotificationChangeData: (data: NotificationTypeEntity | null) => void,
    changeCreateNotificationType: (type_name?: "TIME" | "PERCENT" | "VALUE",
                                   hour?: number,
                                   minute?: number,
                                   value?: number,
                                   percent?: number,
                                   type?: "LOWER" | "HIGHER",
                                   notificationType?: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE",
                                   period?: "HOUR" | "DAY" | "WEEK" | "MONTH"
    ) => void,
    addNotification: (auth: Auth, firestore: Firestore, back: () => void) => void,
    editNotification: (auth: Auth, firestore: Firestore, back: () => void) => void,
    resetCreateNotification: () => void,
    changeNotificationEnabledStatus: (uuid: string, auth: Auth, firestore: Firestore) => void,
    deleteNotifySettings: (uuid: string, auth: Auth, firestore: Firestore, back: () => void) => void,
    changeEditNotificationType: (type_name?: "TIME" | "PERCENT" | "VALUE",
                                 hour?: number,
                                 minute?: number,
                                 value?: number,
                                 percent?: number,
                                 type?: "LOWER" | "HIGHER",
                                 notificationType?: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE",
                                 period?: "HOUR" | "DAY" | "WEEK" | "MONTH"
    ) => void,
}

const init_state = {
    notificationData: undefined,
    eventEdit: {
        uuid: undefined,
        percent: 0.0,
        hour: 0,
        minute: 0,
        value: 0.0,
        isDataCorrect: false,
        isProcessing: false,
    },
    eventCreate: {
        value: 0.0,
        percent: 0.0,
        hour: 0,
        minute: 0,
        isDataCorrect: false,
        isProcessing: false
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
        set(state => ({
            ...state,
            eventCreate: {
                ...state.eventCreate,
                isProcessing: true
            }
        }))
        const optionsToType = (): PercentNotificationSettings | TimeNotificationSettings | ValueNotificationSettings => {
            switch (useChangeNotificationStore.getState().eventCreate.notificationType) {
                case "PERCENT_TYPE":
                    return {
                        percent: useChangeNotificationStore.getState().eventCreate.percent,
                        period: useChangeNotificationStore.getState().eventCreate.period,
                        notificationType: useChangeNotificationStore.getState().eventCreate.notificationType
                    }
                case "TIME_TYPE":
                    return {
                        notificationType: useChangeNotificationStore.getState().eventCreate.notificationType,
                        hour: useChangeNotificationStore.getState().eventCreate.hour,
                        minute: useChangeNotificationStore.getState().eventCreate.minute
                    }
                case "VALUE_TYPE":
                default:
                    return {
                        notificationType: useChangeNotificationStore.getState().eventCreate.notificationType,
                        value: useChangeNotificationStore.getState().eventCreate.value,
                        type: useChangeNotificationStore.getState().eventCreate.type
                    }
            }
        }
        const notification: NotificationTypeEntity = {
            uuid: uuid(),
            type_name: useChangeNotificationStore.getState().eventCreate.type_name,
            enabled: true,
            options: optionsToType()
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
                        await setDoc(document, {...data}).catch(e => {
                        })
                        if (val != undefined) {
                            back()
                            useAddNotificationStore.getState().setSettings({
                                currencySymbol: val.currencySymbol,
                                secondCurrencySymbol: val.secondCurrencySymbol,
                                notificationTypes: val.notificationTypes
                            })
                        }
                    }
                    set(state => ({
                        ...state,
                        eventCreate: {
                            ...state.eventCreate,
                            isProcessing: false
                        }
                    }))
                }
            ).catch(() => {
                set(state => ({
                    ...state,
                    eventCreate: {
                        ...state.eventCreate,
                        isProcessing: false
                    }
                }))
            })
        }
    },
    changeCreateNotificationType: (type_name, hour, minute, value, percent, type, notificationType, period) => {
        const isDataCorrect = () => {
            switch (type_name) {
                case "VALUE":
                    return type != undefined && value >= 0
                case "PERCENT":
                    return period != undefined && percent != 0
                case "TIME":
                    return 0 <= hour <= 24 && 0 <= minute <= 60
                default:
                    return false
            }
        }
        const notificationTypeFun = () => {
            switch (type_name) {
                case "TIME":
                    return "TIME_TYPE"
                case "VALUE":
                    return "VALUE_TYPE"
                case "PERCENT":
                    return "PERCENT_TYPE"
                default:
                    return undefined
            }
        }
        set(state => ({
            ...state,
            eventCreate: {
                ...state.eventCreate,
                type_name: type_name,
                hour: hour,
                minute: minute,
                value: value,
                percent: percent,
                type: type,
                notificationType: notificationTypeFun(),
                period: period,
                isDataCorrect: isDataCorrect()
            }
        }))
    },
    resetCreateNotification: () => {
        set(state => ({
            ...state,
            eventCreate: {
                ...init_state.eventCreate
            }
        }))
    },
    changeNotificationEnabledStatus: (uuid: string, auth: Auth, firestore: Firestore) => {
        if (auth.currentUser != null) {
            const document = doc(firestore, USER_SETTINGS, auth.currentUser.uid)
            getDoc(document)
                .then(async (doc) => {
                    if (doc.exists()) {
                        const data = doc.data() as UserSettings
                        data.notification_settings =
                            data.notification_settings.map(s => {
                                s.notificationTypes =
                                    s.notificationTypes.map(e => {
                                        if (e.uuid === uuid) {
                                            e.enabled = !e.enabled
                                        }
                                        return e;
                                    })

                                return s
                            })
                        let wtf = data.notification_settings
                            .findLast(value => value.currencySymbol === useChangeNotificationStore.getState().notificationData?.currencySymbol &&
                                value.secondCurrencySymbol === useChangeNotificationStore.getState().notificationData?.secondCurrencySymbol
                            )
                        await setDoc(document, {...data})
                        set(state => ({
                            ...state,
                            notificationData: data.notification_settings
                                .findLast(value => value.currencySymbol === useChangeNotificationStore.getState().notificationData?.currencySymbol &&
                                    value.secondCurrencySymbol === useChangeNotificationStore.getState().notificationData?.secondCurrencySymbol
                                )
                        }))
                    }
                })
                .catch(() => {
                })
        }
    },
    setNotificationChangeData: (data: NotificationTypeEntity | null) => {

        const map = (): {} => {
            if (data == null) {
                return {}
            }
            switch (data.type_name) {
                case "PERCENT":
                    const percentData = data.options as PercentNotificationSettings
                    return ({
                            ...init_state.eventCreate,
                            uuid: data.uuid,
                            type_name: data.type_name,
                            percent: percentData.percent,
                            notificationType: percentData.notificationType,
                            period: percentData.period,
                            isDataCorrect: true,
                        }
                    )
                case "TIME":
                    const timeData = data.options as TimeNotificationSettings
                    return ({
                            ...init_state.eventCreate,
                            uuid: data.uuid,
                            type_name: data.type_name,
                            hour: timeData.hour,
                            minute: timeData.minute,
                            notificationType: timeData.notificationType,

                        }
                    )
                case "VALUE":
                    const valueData = data.options as ValueNotificationSettings
                    return ({
                            ...init_state.eventCreate,
                            uuid: data.uuid,
                            type_name: data.type_name,
                            value: valueData.value,
                            type: valueData.type,
                            notificationType: valueData.notificationType,
                            isDataCorrect: true,
                        }
                    )
            }
        }
        const val = map()
        set(state => ({
            ...state,
            eventEdit: {
                ...state.eventEdit,
                ...val
            }
        }))
    },
    deleteNotifySettings: (uuid: string, auth: Auth, firestore: Firestore, back) => {
        if (auth.currentUser != null) {
            const document = doc(firestore, USER_SETTINGS, auth.currentUser.uid)
            getDoc(document)
                .then(async (doc) => {
                    if (doc.exists()) {
                        const data = doc.data() as UserSettings
                        data.notification_settings =
                            data.notification_settings.map(s => {
                                s.notificationTypes =
                                    s.notificationTypes.filter(e => e.uuid != uuid)
                                return s
                            })
                        await setDoc(document, {...data})
                        data.notification_settings
                        set(state => ({
                            ...state,
                            notificationData: data.notification_settings
                                .findLast(value => value.currencySymbol === useChangeNotificationStore.getState().notificationData?.currencySymbol &&
                                    value.secondCurrencySymbol === useChangeNotificationStore.getState().notificationData?.secondCurrencySymbol
                                )
                        }))
                        back()
                    }
                })
                .catch((e) => {
                })
        }
    },
    changeEditNotificationType: (type_name, hour, minute, value, percent, type, notificationType, period) => {
        const isDataCorrect = () => {
            switch (type_name) {
                case "VALUE":
                    return type != undefined && value >= 0
                case "PERCENT":
                    return period != undefined && percent != 0
                case "TIME":
                    return 0 <= hour <= 24 && 0 <= minute <= 60
                default:
                    return false
            }
        }
        const notificationTypeFun = () => {
            switch (type_name) {
                case "TIME":
                    return "TIME_TYPE"
                case "VALUE":
                    return "VALUE_TYPE"
                case "PERCENT":
                    return "PERCENT_TYPE"
                default:
                    return undefined
            }
        }
        set(state => ({
            ...state,
            eventEdit: {
                ...state.eventEdit,
                type_name: type_name,
                hour: hour,
                minute: minute,
                value: value,
                percent: percent,
                type: type,
                notificationType: notificationTypeFun(),
                period: period,
                isDataCorrect: isDataCorrect()
            }
        }))
    },
    editNotification: (auth: Auth, firestore: Firestore, back: () => void) => {
        set(state => ({
            ...state,
            eventEdit: {
                ...state.eventEdit,
                isProcessing: true
            }
        }))
        const optionsToType = (): PercentNotificationSettings | TimeNotificationSettings | ValueNotificationSettings => {
            switch (useChangeNotificationStore.getState().eventEdit.notificationType) {
                case "PERCENT_TYPE":
                    return {
                        percent: useChangeNotificationStore.getState().eventEdit.percent,
                        period: useChangeNotificationStore.getState().eventEdit.period,
                        notificationType: useChangeNotificationStore.getState().eventEdit.notificationType
                    }
                case "TIME_TYPE":
                    return {
                        notificationType: useChangeNotificationStore.getState().eventEdit.notificationType,
                        hour: useChangeNotificationStore.getState().eventEdit.hour,
                        minute: useChangeNotificationStore.getState().eventEdit.minute
                    }
                case "VALUE_TYPE":
                default:
                    return {
                        notificationType: useChangeNotificationStore.getState().eventEdit.notificationType,
                        value: useChangeNotificationStore.getState().eventEdit.value,
                        type: useChangeNotificationStore.getState().eventEdit.type
                    }
            }
        }
        const notification: NotificationTypeEntity = {
            uuid: uuid(),
            type_name: useChangeNotificationStore.getState().eventEdit.type_name,
            enabled: true,
            options: optionsToType()
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
                            const id = data.notification_settings[isIn].notificationTypes.findIndex(s => s.uuid === useChangeNotificationStore.getState().eventEdit.uuid)
                            if (data.notification_settings[isIn].notificationTypes.hasOwnProperty(id)) {
                                data.notification_settings[isIn].notificationTypes[id] = notification
                            }
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
                        await setDoc(document, {...data}).catch(e => {
                        })
                        if (val != undefined) {
                            back()
                            useAddNotificationStore.getState().setSettings({
                                currencySymbol: val.currencySymbol,
                                secondCurrencySymbol: val.secondCurrencySymbol,
                                notificationTypes: val.notificationTypes
                            })
                        }
                    }
                    set(state => ({
                        ...state,
                        eventEdit: {
                            ...state.eventEdit,
                            isProcessing: false
                        }
                    }))
                }
            ).catch(() => {
                set(state => ({
                    ...state,
                    eventEdit: {
                        ...state.eventCreate,
                        isProcessing: false
                    }
                }))
            })
        }
    }
}));
