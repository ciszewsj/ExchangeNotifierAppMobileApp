import {FC} from "react";
import {AntDesign} from "@expo/vector-icons";
import {Text, View} from "react-native";

export const PercentChangeMolecule: FC<{
    current?: number | undefined;
    averageYesterday?: number | undefined;
}> = ({current, averageYesterday}) => {

    const renderText = (): string => {
        if (current == undefined || averageYesterday == undefined) {
            return "-"
        }
        return (averageYesterday / current * 100 - 100).toFixed(2)
    }

    const renderSign: FC = () => {
        if (current == undefined || averageYesterday == undefined) {
        }
        const value = averageYesterday / current * 100 - 100
        if (value > 0) {
            return <AntDesign name="caretup" size={24} color="green"/>
        } else if (value < 0) {
            return <AntDesign name="caretdown" size={24} color="red"/>
        } else {
            return <AntDesign name="minus" size={24} color="gray"/>
        }
    }

    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
            {renderSign({}, undefined)}
            <Text>{renderText()}</Text>
        </View>
    )
}
