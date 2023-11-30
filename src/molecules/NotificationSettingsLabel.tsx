import {Pressable, Text, View} from "react-native";
import {Card} from "../topography/Card";
import {NormalSwitch} from "../atoms/NormalSwitch";
import {FC} from "react";
import {Screens} from "../routers/Screens";

export const NotificationSettingsLabel: FC<{ setScreen }> = ({setScreen}) => {
    return (
        <View style={{margin: 5}}>
            <Pressable onPress={() => {
                setScreen(Screens.EDIT)
            }}>
                <Card>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}>Value is less than...</Text>
                            <Text numberOfLines={1}>4.70</Text>
                        </View>
                        <NormalSwitch value={false} onChange={() => {
                        }}/>
                    </View>
                </Card>
            </Pressable>
        </View>
    )
}
