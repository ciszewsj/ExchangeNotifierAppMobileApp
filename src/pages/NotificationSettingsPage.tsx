import React, {FC} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import {NotificationSettingsOrganism} from "../organisms/NotificationSettingsOrganism";


export const NotificationSettingsPage: FC<{}> = () => {


    return (<View>
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <NotificationSettingsOrganism/>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>)
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
