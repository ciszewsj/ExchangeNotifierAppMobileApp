import {NormalText} from "../topography/NormalText";
import {Pressable, StyleSheet, View} from "react-native";
import {FC} from "react";
import {useSettingsStore} from "../store/settingsStore";

export const Selector: FC<{
    text?: string
    isActive?: boolean
    onPress?: any
}> = ({text, isActive, onPress}) => {
    const style = useSettingsStore().data.style

    return (
        <Pressable onPress={onPress ? onPress : () => {
        }}>
            <View
                style={[styles.activeSelector, style === "dark" && styles.darkMode, !isActive && styles.unActiveSelector]}>
                <NormalText>{text}</NormalText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    activeSelector: {
        backgroundColor: "white",
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        borderRadius: 20
    },
    unActiveSelector: {
        // backgroundColor: "#FOFOFO"
        backgroundColor: "rgba(169,169,169,0.94)",
        color: "#FOFOFO"
    },
    darkMode: {
        backgroundColor: "black",
        shadowColor: "#fff",

    }
});



