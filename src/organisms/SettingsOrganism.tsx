import {StyleSheet, Text, View} from "react-native";
import {Card} from "../topography/Card";
import {NormalSwitch} from "../atoms/NormalSwitch";
import {NormalButton} from "../atoms/NormalButton";
import {auth} from "../firebase/firebase";
import React, {FC} from "react";
import {useSettingsStore} from "../store/settingsStore";
import {NormalText} from "../topography/NormalText";

export const SettingsOrganism: FC<{}> = () => {
    const logout = useSettingsStore().logout
    const setDarkMode = useSettingsStore().changeStyle
    const style = useSettingsStore().data.style

    return (
        <View style={{padding: 15, flexGrow: 1}}>
            <View style={styles.content}>
                <Card>
                    <View style={{alignItems: "center", flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            <NormalText>All notifications</NormalText>
                        </View>
                        <NormalSwitch/>
                    </View>
                </Card>
                <Card>
                    <View style={{alignItems: "center", flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            <NormalText>Dark mode</NormalText>
                        </View>
                        <NormalSwitch value={style === "dark"} onChange={setDarkMode}/>
                    </View>
                </Card>
            </View>
            <NormalButton text={"Sing out"} isActive={true} isProcessing={false}
                          onPress={() => (logout(auth))}/>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        marginHorizontal: 0,
        gap: 15
    },
})
