import React, {FC, useEffect} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {Card} from "../topography/Card";
import {NormalButton} from "../atoms/NormalButton";
import {useAddNotificationStore} from "../store/notificationSettingsStore";
import {useNavigation, useRoute} from "@react-navigation/native";
import {auth, firestore} from "../firebase/firebase";


export const NotificationSettingsPage: FC<{}> = () => {

    const setSettings = useAddNotificationStore().setSettings
    const deleteNotificationSettings = useAddNotificationStore().deleteNotificationSettings
    const deleteData = useAddNotificationStore().deleteData

    const navigation = useNavigation()
    const route = useRoute();

    const {settings} = route.params;

    useEffect(() => {
        if (settings) {
            setSettings(settings)
        }
    }, [settings])

    return <View>
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{padding: 15, flexGrow: 1}}>
                    <View style={styles.content}>
                        <Card>
                            <View style={{alignItems: "center", flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text>All notifications</Text>
                                </View>
                                <Switch/>
                            </View>
                        </Card>
                    </View>
                    <NormalButton text={"Delete"} isActive={!deleteData.isProcessing}
                                  isProcessing={deleteData.isProcessing} onPress={() => {
                        deleteNotificationSettings(firestore, auth, navigation)
                    }}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
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
