import React, {FC} from "react";
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {ButtonText} from "../topography/ButtonText";
import {useSettingsStore} from "../store/settingsStore";

export const NormalButton: FC<{
    text: string;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    isActive?: boolean;
    isProcessing?: boolean;
}> = ({onPress, text, isActive, isProcessing}) => {
    const style = useSettingsStore().data.style

    return (
        <Pressable
            style={[styles.textInput, style === "dark" && styles.darkMode, !isActive && {backgroundColor: "#D9D9D9"},
                !isActive && style === "dark" && {backgroundColor: "#424242"}]}
            onPress={onPress}
            disabled={!isActive}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <ButtonText>{text}</ButtonText>
                </View>
                    {isProcessing &&
                    <View style={{marginLeft: 5}}>
                        <ActivityIndicator color={"black"}/>
                    </View>}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    darkMode: {
        backgroundColor: "#000",
        shadowColor: "#fff",
    }
});
