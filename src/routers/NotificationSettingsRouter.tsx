import React, {FC, useEffect, useState} from "react";
import {Pressable, View} from "react-native";
import {DataModal} from "../atoms/DataModal";
import {NotificationSettingsAllPage} from "../pages/dropdown/NotificationSettingsAllPage";
import {NotificationSettingsAddPage} from "../pages/dropdown/NotificationSettingsAddPage";
import {useChangeNotificationStore} from "../store/changeNotificationSettings";
import {NotificationSettingEntity} from "../firebase/UserSettings";
import {Screens} from "./Screens";
import {Ionicons} from '@expo/vector-icons';
import {NotificationSettingsEditPage} from "../pages/dropdown/NotificationSettingsEditPage";


export const NotificationSettingsRouter: FC<{
    isModalVisible: boolean,
    setModalVisible,
    data: NotificationSettingEntity | null
}> = ({
          isModalVisible, setModalVisible, data
      }) => {
    const [screen, setScreen] = useState(Screens.MAIN);

    const setNotificationData = useChangeNotificationStore().setNotificationData

    useEffect(() => {
        setNotificationData(data)
    }, [data])

    useEffect(() => {
        setScreen(Screens.MAIN)
    }, [isModalVisible])

    const renderScreen = () => {
        switch (screen) {
            case Screens.MAIN:
                return <NotificationSettingsAllPage setScreen={setScreen}
                                                    settings={data != null && data.notificationTypes != null ? data.notificationTypes : []}/>;
            case Screens.ADD:
                return <NotificationSettingsAddPage back={() => setScreen(Screens.MAIN)}/>
            case Screens.EDIT:
                return <NotificationSettingsEditPage back={() => setScreen(Screens.MAIN)}/>
            default:
                return <View/>
        }
    }

    const notificationSettingsName = () => {
        switch (screen) {
            case Screens.MAIN:
                return "Notify rules"
            case Screens.ADD:
                return "Add rule"
            case Screens.EDIT:
                return "Edit rule"
            default:
                ""
        }
    }

    return (
        <DataModal title={notificationSettingsName()} onRequestClose={() => {
            setModalVisible(false)
        }} visible={isModalVisible}
                   backButton={screen !== Screens.MAIN ?
                       <Pressable onPress={() => setScreen(Screens.MAIN)}>
                           <Ionicons name="arrow-back" size={32} color="black"/>
                       </Pressable> : undefined}>
            <View style={{height: "100%"}}>
                <View style={{height: "90%"}}>
                    {renderScreen()}
                </View>
            </View>
        </DataModal>
    )
}
