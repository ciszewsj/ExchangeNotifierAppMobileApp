import {Pressable, Text, View} from "react-native";
import {Card} from "../topography/Card";
import {NormalSwitch} from "../atoms/NormalSwitch";
import {FC} from "react";
import {Screens} from "../routers/Screens";
import {
    NotificationTypeEntity,
    PercentNotificationSettings,
    TimeNotificationSettings,
    ValueNotificationSettings
} from "../firebase/UserSettings";
import {useChangeNotificationStore} from "../store/changeNotificationSettings";
import {auth, firestore} from "../firebase/firebase";
import {SecondaryText} from "../topography/SecondaryText";

export const NotificationSettingsLabel: FC<{
    setScreen, notification: NotificationTypeEntity
}> = ({
          setScreen,
          notification
      }) => {

    const changeNotificationEnabledStatus = useChangeNotificationStore().changeNotificationEnabledStatus
    const setNotificationChangeData = useChangeNotificationStore().setNotificationChangeData

    const name = () => {

        switch (notification.type_name) {
            case "PERCENT":
                return "The value change ..."
            case "TIME":
                return "Time is..."
            case "VALUE":
                const valueOption = notification.options as ValueNotificationSettings
                if (valueOption.type === "LOWER") {
                    return "Value is lower than..."
                }
                return "Value is higher than..."
            default:
                return "---"
        }
    }
    const description = () => {

        switch (notification.type_name) {
            case "PERCENT":
                const percentOption = notification.options as PercentNotificationSettings
                return percentOption.percent + "% during " + percentOption.period
            case "TIME":
                const timeOption = notification.options as TimeNotificationSettings
                return "equal " + timeOption.hour + ":" + timeOption.minute
            case "VALUE":
                const valueOption = notification.options as ValueNotificationSettings
                return valueOption.value
            default:
                return "---"
        }
    }

    return (
        <View style={{margin: 5}}>
            <Pressable onPress={async () => {
                await setNotificationChangeData(notification)
                setScreen(Screens.EDIT)
            }}>
                <Card>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{flex: 1}}>
                            <SecondaryText numberOfLines={1}>{name()}</SecondaryText>
                            <SecondaryText numberOfLines={1}>{description()}</SecondaryText>
                        </View>
                        <NormalSwitch value={notification.enabled} onChange={() => {
                            changeNotificationEnabledStatus(notification.uuid, auth, firestore)
                        }}/>
                    </View>
                </Card>
            </Pressable>
        </View>
    )
}
