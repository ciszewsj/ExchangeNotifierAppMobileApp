import {StyleSheet, TextInput} from "react-native";
import {FC} from "react";

export const InputData: FC<{ value: any, onChange: any, placeholder: string }> = ({value, onChange, placeholder}) => {
    return (
        <TextInput style={styles.textInput}
                   defaultValue={"TEXT"} value={value} placeholder={placeholder}
                   onChangeText={e => {
                       onChange(e)
                   }}/>
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
