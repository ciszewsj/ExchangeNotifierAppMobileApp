import {StyleSheet, TextInput} from "react-native";
import {FC} from "react";
import {KeyboardTypeOptions} from "react-native/Libraries/Components/TextInput/TextInput";

export const InputData: FC<{
    value: any,
    onChange: any,
    placeholder: string,
    keyboardType?: KeyboardTypeOptions | undefined,
    secureText?: boolean | undefined
}> = ({
          value,
          onChange,
          placeholder,
          keyboardType,
          secureText
      }) => {
    return (
        <TextInput style={styles.textInput}
                   defaultValue={"TEXT"}
                   secureTextEntry={secureText}
                   value={value}
                   placeholder={placeholder}
                   keyboardType={keyboardType}
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
