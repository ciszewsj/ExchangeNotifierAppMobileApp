import {StyleSheet, TextInput, Text, View, Pressable} from "react-native";
import {FC, useState} from "react";
import {KeyboardTypeOptions} from "react-native/Libraries/Components/TextInput/TextInput";
import {MaterialIcons} from '@expo/vector-icons';
import Tooltip, {Placement} from "react-native-tooltip-2";
import {useSettingsStore} from "../store/settingsStore";

export const InputData: FC<{
    value?: any,
    onChange?: any,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions | undefined,
    isActive?: boolean;
    secureText?: boolean | undefined;
    description?: string | null;
    icon?: any | undefined
}> = ({
          value,
          onChange,
          placeholder,
          keyboardType,
          isActive,
          secureText,
          description,
          icon

      }) => {
    const style = useSettingsStore().data.style

    const [isFocused, setIsFocused] = useState(false)
    const [used, setUsed] = useState(false)

    return (
        <View
            style={[styles.textInput, style === "dark" && styles.darkMode, !isActive && {backgroundColor: "#D9D9D9"}, isActive && description != null && description.length > 0 && {shadowColor: "red"}]}>
            <View style={{flex: 1}}>
                <TextInput
                    style={
                        style === "dark" && {
                            color: "white"
                        }
                    }
                    defaultValue={"TEXT"}
                    secureTextEntry={secureText}
                    value={value}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    onChangeText={e => {
                        onChange(e)
                    }}
                    placeholderTextColor={style === "dark" ? "lightgray" : "gray"}
                    editable={isActive}
                    onFocus={() => (setIsFocused(true))}
                    onBlur={() => (setIsFocused(false))}/>
            </View>
            {
                !isFocused && icon != undefined &&
                <View>
                    {icon}
                </View>
            }
            {!isFocused && description != null && description.length > 0 &&
                <View>
                    <Tooltip isVisible={used}
                             content={<Text>{description}< /Text>}
                             placement={Placement.TOP}
                             onClose={() => {
                                 setUsed(false)
                             }}>
                        <Pressable onPress={() => {
                            setUsed(true)
                        }}>
                            <MaterialIcons name="error-outline" size={24} color="red"/>
                        </Pressable>
                    </Tooltip>
                </View>
            }
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
    darkMode: {
        backgroundColor: "#000",
        shadowColor: "#fff",
    },
    error: {
        shadowColor: "red"
    }
});
