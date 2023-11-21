import {FC, useLayoutEffect} from "react";
import {View, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export const AppViewTemplate: FC<{ children: FC }> = ({children}) => {
    const navigation = useNavigation()
    console.log(navigation.getState())

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{marginRight: 15}}>
                    <Ionicons name="notifications-outline" size={32} color="black"/>
                </View>
            ),
        });
    }, [navigation]);
    return (
        <View style={{flex: 1}}>{children}</View>
    )
}
