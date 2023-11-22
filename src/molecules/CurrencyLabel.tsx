import {FC} from "react";
import {Card} from "../topography/Card";
import {Pressable, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {NotificationSettingEntity} from "../firebase/UserSettings";

export const CurrencyLabel: FC<{ currency: NotificationSettingEntity }> = ({currency}) => {
    const nav = useNavigation();
    return (
        <View style={{margin: 5}}>
            <Pressable onPress={() => {
                nav.navigate("EUR-USD", {})
            }}>
                <Card>
                    <View style={{flexDirection: "row", gap: 5}}>
                        <View style={{flex: 1, justifyContent: "center"}}>
                            <Text
                                style={{fontSize: 24}}>{currency.currencySymbol}-{currency.secondCurrencySymbol}</Text>
                        </View>
                        <View style={{justifyContent: "center"}}>
                            <Text style={{fontSize: 24}}>1.09</Text>
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <AntDesign name="caretup" size={24} color="green"/>
                            <Text>-50.0%</Text>
                        </View>
                    </View>
                </Card>
            </Pressable>
        </View>
    )
}
