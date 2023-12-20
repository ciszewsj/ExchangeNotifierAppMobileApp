import {FC} from "react";
import {Text, StyleSheet} from "react-native";
import {useSettingsStore} from "../store/settingsStore";

export const SecondaryText: FC<{ children?: string }> = ({children}) => {
    const style = useSettingsStore().data.style

    return (
        <Text style={[styles.classic, style === "dark" && styles.darkMode]}>{children}</Text>
    )
}
const styles = StyleSheet.create({
    classic: {
        color: "black",
    },
    darkMode: {
        color: "white"
    }
})
