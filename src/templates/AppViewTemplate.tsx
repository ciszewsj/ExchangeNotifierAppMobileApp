import {FC, useLayoutEffect} from "react";
import {View, Text, Pressable, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {DataModal} from "../atoms/DataModal";
import {Card} from "../topography/Card";
import {NotificationController, useNotificationStore} from "../store/notificationStore";

export const AppViewTemplate: FC<{ children: FC }> = ({children}) => {
    const navigation = useNavigation()

    const notificationController: NotificationController = useNotificationStore()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{marginRight: 15}}>
                    <Pressable onPress={notificationController.openModal}>
                        <Ionicons name="notifications-outline" size={32} color="black"/>
                    </Pressable>
                </View>
            ),
        });
    }, [navigation]);
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>{children}</View>
            <DataModal title={"Notifications"} onRequestClose={() => {
                notificationController.closeModal()
            }} visible={notificationController.isModalOpen}>
                <View style={{paddingBottom: 35, height: "100%"}}>
                    <ScrollView style={{flexGrow: 1}}>
                        <View style={{margin: 5}}>
                            <Card>
                                <View>
                                    <Text>EUR-USD</Text>
                                    <Text>21.09.2023 16:50</Text>
                                </View>
                            </Card>
                        </View>
                    </ScrollView>
                </View>
            </DataModal>
        </View>
    )
}
