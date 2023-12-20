import {View, StyleSheet} from "react-native";
import {FC} from "react";
import {useSettingsStore} from "../store/settingsStore";

export const Card: FC<{
    children: FC;
}> = ({children}) => {
    const style = useSettingsStore().data.style

    return <View style={[styles.cardContainer, style === "dark" && styles.darkMode]}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
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
    darkMode: {
        backgroundColor: "#000",
        shadowColor: "#fff",
    }
});
