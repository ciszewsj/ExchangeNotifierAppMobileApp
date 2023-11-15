import {FC} from "react";
import {Pressable, StyleSheet} from "react-native";

export const NormalButton: FC<{ children: FC; }> = ({children}) => {

    return (
        <Pressable style={styles.textInput} onPress={e => {
            console.log("!@#?")
        }}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#fff",
        borderRadius: 50,
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
});
