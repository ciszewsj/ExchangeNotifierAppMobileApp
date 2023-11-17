import {FC} from "react";
import {Text} from "react-native";

export const ButtonText: FC<{ children?: string }> = ({children}) => {
    return (
        <Text style={{textAlign: "center", }}>{children}</Text>
    )
}
