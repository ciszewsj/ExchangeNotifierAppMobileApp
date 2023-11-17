import {FC} from "react";
import {Text} from "react-native";

export const NormalText: FC<{ children?: string }> = ({children}) => {


    return <Text style={{fontSize: 24,}}>{children}</Text>
}
