import {Pressable, ScrollView, Text, View} from "react-native";
import {Card} from "../../topography/Card";
import React, {FC} from "react";
import {NotificationSettingsLabel} from "../../molecules/NotificationSettingsLabel";
import {NotificationTypeEntity} from "../../firebase/UserSettings";
import {Screens} from "../../routers/Screens";

export const NotificationSettingsAllPage: FC<{
    setScreen, settings: NotificationTypeEntity[]
}> = ({
          setScreen,
          settings
      }) => {

    return (
        <View>
            <ScrollView style={{height: "100%"}}>
                {settings != undefined && settings.map(setting => <NotificationSettingsLabel key={setting.uuid}
                                                                                             setScreen={setScreen}/>)}
                <View style={{height: 65}}/>
            </ScrollView>

            <View style={{
                position: "absolute",
                right: 0, bottom: 0,
                margin: 5
            }}>
                <Pressable onPress={() => setScreen(Screens.ADD)}>
                    <Card>
                        <View
                            style={{width: 25, height: 25, justifyContent: "center", alignItems: "center"}}>
                            <Text>+</Text>
                        </View>
                    </Card>
                </Pressable>
            </View>
        </View>
    )
}
