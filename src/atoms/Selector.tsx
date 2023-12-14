import {NormalText} from "../topography/NormalText";
import {Pressable, StyleSheet, View} from "react-native";
import {FC} from "react";

export const Selector: FC<{
    text?: string
    isActive?: boolean
    onPress?: any
}> = ({text, isActive, onPress}) => {
    return (
        <Pressable onPress={onPress ? onPress : () => {
        }}>
            <View style={[styles.activeSelector, !isActive && styles.unActiveSelector]}>
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
        backgroundColor: "#FOFOFO"
    }
});



