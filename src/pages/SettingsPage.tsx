import React, {FC} from "react";
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {Card} from "../topography/Card";
import {NormalButton} from "../atoms/NormalButton";
import {InputData} from "../atoms/InputData";
import {Octicons} from "@expo/vector-icons";

export const SettingsPage: FC<{}> = () => {
    return (<AppViewTemplate>
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={{padding: 15, flexGrow: 1}}>
                        <View style={styles.content}>
                            <Card>
                                <View style={{alignItems: "center", flexDirection: "row"}}>
                                    <View style={{flex: 1}}>
                                        <Text>All notifications</Text>
                                    </View>
                                    <Switch/>
                                </View>
                            </Card>
                        </View>
                        <NormalButton text={"Sing out"}/>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    content: {
        flexGrow: 1,
        marginHorizontal: 0
    },
});
