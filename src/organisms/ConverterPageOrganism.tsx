import {StyleSheet, Text, View} from "react-native";
import {Octicons} from "@expo/vector-icons";
import React from "react";
import {InputData} from "../atoms/InputData";
import {useConverterStore} from "../store/convertCurrenciesStore";

export const ConverterPageOrganism = () => {
    const data = useConverterStore().data
    const convertFromMainCurrency = useConverterStore().convertFromMainCurrency
    const convertFromSecondaryCurrency = useConverterStore().convertFromSecondaryCurrency
    return (
        <View style={{padding: 15, flexGrow: 1}}>
            <View style={styles.content}/>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <Text>Main currency:</Text>
                <InputData onChange={convertFromMainCurrency} isActive={true} value={data.mainCurrency}
                           keyboardType={"number-pad"} placeholder={"1.00"}/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center", flexGrow: 1}}>
                <Octicons name="arrow-switch" size={54} color="black"/>
                <Text>x {data.exchangeRate}</Text>
            </View>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <Text>Secondary currency:</Text>
                <InputData onChange={convertFromSecondaryCurrency} isActive={true} value={data.secondaryCurrency}
                           keyboardType={"number-pad"}
                           placeholder={"1.00"}/>
            </View>
            <View style={styles.content}/>
        </View>
    )
}
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        margin: 0,
        padding: 0,
        width: "100%",
    },
    content: {
        flexGrow: 1,
        marginHorizontal: 0
    },
});
