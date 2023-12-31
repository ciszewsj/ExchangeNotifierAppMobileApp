import {StyleSheet, Text, View} from "react-native";
import {Octicons} from "@expo/vector-icons";
import React, {useEffect} from "react";
import {InputData} from "../atoms/InputData";
import {useConverterStore} from "../store/convertCurrenciesStore";
import {CurrencySettings} from "../store/homePageStore";
import {useRoute} from "@react-navigation/native";
import {ExchangeRate} from "../firebase/ExchangeRate";
import {useSettingsStore} from "../store/settingsStore";
import {SecondaryText} from "../topography/SecondaryText";

export const ConverterPageOrganism = () => {
    const data = useConverterStore().data
    const style = useSettingsStore().data.style

    const currentValue = (rates?: ExchangeRate[] | undefined) => {
        if (rates == undefined || rates.length === 0) {
            return 0
        } else {
            return rates.reduce((acc, val) => acc.date > val.date ? acc : val).rate

        }
    }

    const values: CurrencySettings = useRoute().params.settings as CurrencySettings

    const convertFromMainCurrency = useConverterStore().convertFromMainCurrency
    const convertFromSecondaryCurrency = useConverterStore().convertFromSecondaryCurrency
    const setConverterValue = useConverterStore().setConverterValue

    useEffect(() => {
        setConverterValue(currentValue(values.current_values))
    }, [values])
    return (
        <View style={{padding: 15, flexGrow: 1}}>
            <View style={styles.content}/>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <SecondaryText>Main currency:</SecondaryText>
                <InputData onChange={convertFromMainCurrency} isActive={true} value={data.mainCurrency}
                           keyboardType={"number-pad"} placeholder={"1.00"}/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center", flexGrow: 1}}>
                <Octicons name="arrow-switch" size={54} color={style === "dark" ? "white" : "black"}/>
                <SecondaryText>x {data.exchangeRate.toString()}</SecondaryText>
            </View>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <SecondaryText>Secondary currency:</SecondaryText>
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
