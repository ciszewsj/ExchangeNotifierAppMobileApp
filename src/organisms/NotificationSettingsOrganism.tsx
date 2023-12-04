import {Pressable, StyleSheet, Switch, Text, View} from "react-native";
import {Card} from "../topography/Card";
import {NormalButton} from "../atoms/NormalButton";
import {auth, firestore} from "../firebase/firebase";
import React, {useEffect, useMemo, useState} from "react";
import {useAddNotificationStore} from "../store/notificationSettingsStore";
import {useNavigation, useRoute} from "@react-navigation/native";
import {NotificationSettingsRouter} from "../routers/NotificationSettingsRouter";
import {CurrencySettings} from "../store/homePageStore";

export const NotificationSettingsOrganism = () => {

    const notificationSettings = useAddNotificationStore().settings
    const setSettings = useAddNotificationStore().setSettings
    const deleteNotificationSettings = useAddNotificationStore().deleteNotificationSettings
    const deleteData = useAddNotificationStore().deleteData
    const changeStatusOfAllNotification = useAddNotificationStore().changeStatusOfAllNotification

    const navigation = useNavigation()
    const route = useRoute();

    const {settings} = useMemo(() => route.params, []);

    const [isModalVisible, setModalVisible] = useState(false)

    const modal = useMemo(() => {
        return <NotificationSettingsRouter isModalVisible={isModalVisible} setModalVisible={setModalVisible}
                                           data={notificationSettings}/>
    }, [isModalVisible, setModalVisible, notificationSettings])

    useEffect(() => {
        const currencySettings = settings as CurrencySettings
        if (currencySettings) {
            setSettings({
                currencySymbol: currencySettings.mainCurrency,
                secondCurrencySymbol: currencySettings.secondaryCurrency,
                notificationTypes: currencySettings.notification_settings
            })
        }
    }, [settings])
    return (
        <View style={{padding: 15, flexGrow: 1}}>
            <View style={styles.content}>
                <Pressable onPress={() => {
                    setModalVisible(true)
                }}>
                    <Card>
                        <View style={{alignItems: "center", flexDirection: "row"}}>
                            <View style={{flex: 1}}>
                                <Text>Notifications...</Text>
                            </View>
                            <Switch value={notificationSettings ? notificationSettings.enabled : false}
                                    onChange={() => {
                                        changeStatusOfAllNotification(auth, firestore)
                                    }}/>
                        </View>
                    </Card>
                </Pressable>
            </View>
            <NormalButton text={"Delete"} isActive={!deleteData.isProcessing}
                          isProcessing={deleteData.isProcessing} onPress={() => {
                deleteNotificationSettings(firestore, auth, navigation)
            }}/>
            {modal}
        </View>
    )
}
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        margin: 0,
        padding: 0,
        width: "100%",
    },
    content: {
        flexGrow: 1,
        marginHorizontal: 0
    },
});
