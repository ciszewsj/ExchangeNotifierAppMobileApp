import React, {FC} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import {Circle} from "../topography/Circle";
import {Fontisto} from '@expo/vector-icons';
import {useSettingsStore} from "../store/settingsStore";

export const MainMenuTemplate: FC<{ children: any }> = ({children}) => {
    const style = useSettingsStore().data.style

    return (
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    <View style={{flex: 1, minHeight: 250}}>
                        <Circle>
                            <Fontisto name="money-symbol" size={128} color={style === "dark" ? "white" : "black"}/>
                        </Circle>
                    </View>
                </View>
                <View style={{margin: 25}}>
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 0
    },
});
