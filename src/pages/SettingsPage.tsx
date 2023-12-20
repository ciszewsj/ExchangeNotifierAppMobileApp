import React, {FC} from "react";
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import {SettingsOrganism} from "../organisms/SettingsOrganism";

export const SettingsPage: FC<{}> = () => {


    return (<AppViewTemplate>
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <SettingsOrganism/>
            </ScrollView>
        </KeyboardAvoidingView>
    </AppViewTemplate>)
}
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        margin: 0,
        padding: 0,
        width: "100%",
    },
});
