import {StyleSheet, TextInput, View} from "react-native";
import {FC} from "react";
import {KeyboardTypeOptions} from "react-native/Libraries/Components/TextInput/TextInput";

export const InputData: FC<{
    value?: any,
    onChange?: any,
    placeholder?: string,
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
        <View style={{...styles.textInput, }}>
            <View style={{flex: 1}}>
                <TextInput
                    defaultValue={"TEXT"}
                    secureTextEntry={secureText}
                    value={value}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    onChangeText={e => {
                        onChange(e)
                    }}/>
            </View>
            {/*<View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: "red"}}/>*/}
        </View>
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
        flexDirection: "row",
        alignItems: "center"
    },
    error: {
        shadowColor: "red"
    }
});
