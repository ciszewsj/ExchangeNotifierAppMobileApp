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

export const NotificationSettingsLabel: FC<{
    setScreen, notification: NotificationTypeEntity
}> = ({
          setScreen,
          notification
      }) => {

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
            <Pressable onPress={() => {
                setScreen(Screens.EDIT)
            }}>
                <Card>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}>{name()}</Text>
                            <Text numberOfLines={1}>{description()}</Text>
                        </View>
                        <NormalSwitch value={notification.enabled} onChange={() => {
                        }}/>
                    </View>
                </Card>
            </Pressable>
        </View>
    )
}
