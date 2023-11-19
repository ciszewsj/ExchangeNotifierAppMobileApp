import React, {FC} from "react";
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";

export const NormalButton: FC<{
    text: string;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    isActive?: boolean;
    isProcessing?: boolean;
}> = ({onPress, text, isActive, isProcessing}) => {

    return (
        <Pressable style={[styles.textInput, !isActive && {backgroundColor: "#D9D9D9"}]} onPress={onPress}
                   disabled={!isActive}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Text style={{textAlign: "center", color: "black"}}>{text}</Text>
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
});
