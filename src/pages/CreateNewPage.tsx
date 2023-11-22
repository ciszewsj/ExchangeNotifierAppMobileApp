import React, {FC} from "react";
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import {CreateNewOrganism} from "../organisms/CreateNewOrganism";

export const CreateNewPage: FC<{}> = () => {
    return (
        <AppViewTemplate>
            <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <CreateNewOrganism/>
                </ScrollView>
            </KeyboardAvoidingView>
        </AppViewTemplate>
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
        marginHorizontal: 0
    },
});
