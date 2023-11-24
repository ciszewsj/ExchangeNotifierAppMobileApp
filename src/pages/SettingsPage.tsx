import React, {FC} from "react";
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {Card} from "../topography/Card";
import {NormalButton} from "../atoms/NormalButton";
import {InputData} from "../atoms/InputData";
import {Octicons} from "@expo/vector-icons";
import {useSettingsStore} from "../store/settingsStore";
import {auth} from "../firebase/firebase";
import {NormalSwitch} from "../atoms/NormalSwitch";

export const SettingsPage: FC<{}> = () => {
    const logout = useSettingsStore().logout
    const setDarkMode = useSettingsStore().changeStyle
    const style = useSettingsStore().style

    return (<AppViewTemplate>
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{padding: 15, flexGrow: 1}}>
                    <View style={styles.content}>
                        <Card>
                            <View style={{alignItems: "center", flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text>All notifications</Text>
                                </View>
                                <NormalSwitch/>
                            </View>
                        </Card>
                        <Card>
                            <View style={{alignItems: "center", flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text>Dark mode</Text>
                                </View>
                                <NormalSwitch value={style === "dark"} onChange={setDarkMode}/>
                            </View>
                        </Card>
                    </View>
                    <NormalButton text={"Sing out"} isActive={true} isProcessing={false}
                                  onPress={() => (logout(auth))}/>
                </View>
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
    content: {
        flexGrow: 1,
        marginHorizontal: 0,
        gap: 15
    },
});
