import {FC} from "react";
import {Text, StyleSheet} from "react-native";
import {useSettingsStore} from "../store/settingsStore";

export const NormalText: FC<{ children?: string }> = ({children}) => {
    const style = useSettingsStore().data.style

    return <Text style={[styles.normal, style === "dark" && styles.darkMode]}>{children}</Text>
}

const styles = StyleSheet.create({
    normal: {
        fontSize: 24,
    },
    darkMode: {
        color: "#fff"
    }
})
