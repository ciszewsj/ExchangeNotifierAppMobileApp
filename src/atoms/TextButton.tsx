import {FC} from "react";
import {Text} from "react-native";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";

export const TextButton: FC<{
    text?: string | undefined
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}> = ({text, onPress}) => {
    return (
        <Text onPress={onPress}
              style={{
                  textAlignVertical: "bottom",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  fontStyle: "italic"
              }}>
            {text}
        </Text>
    )
}
