export type UserSettings = {
    device_settings: UserDeviceSettings[],
    notification_settings: NotificationSettingEntity[]
}

export type UserDeviceSettings = {
    update_time: Date,
    device_token: string
}

export type NotificationSettingEntity = {
    currencySymbol: string,
    secondCurrencySymbol: string,
    notificationTypes: NotificationTypeEntity[],
    enabled?: boolean | undefined

}

export type NotificationTypeEntity = {
    uuid: string,
    type_name: "TIME" | "PERCENT" | "VALUE",
    enabled: boolean,
    options: PercentNotificationSettings | TimeNotificationSettings | ValueNotificationSettings
}

export type PercentNotificationSettings = AbstractNotificationSettings & {
    percent: number,
    period: "HOUR" | "DAY" | "WEEK" | "MONTH"
}

export type TimeNotificationSettings = AbstractNotificationSettings & {
    hour: number,
    minute: number
}

export type ValueNotificationSettings = AbstractNotificationSettings & {
    value: number,
    type: "LOWER" | "HIGHER"
}

export type AbstractNotificationSettings = {
    notificationType: "VALUE_TYPE" | "TIME_TYPE" | "PERCENT_TYPE"
}
