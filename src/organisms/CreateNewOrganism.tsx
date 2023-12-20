import {StyleSheet, Text, View} from "react-native";
import {Octicons} from "@expo/vector-icons";
import {NormalButton} from "../atoms/NormalButton";
import React from "react";
import {CurrencyPicker} from "../molecules/CurrencyPicker";
import {useAddCurrenciesStore} from "../store/addCurrenciesStore";
import {auth, firestore} from "../firebase/firebase";
import {useNavigation} from "@react-navigation/native";
import {useSettingsStore} from "../store/settingsStore";
import {SecondaryText} from "../topography/SecondaryText";

export const CreateNewOrganism = () => {
    const style = useSettingsStore().data.style

    const mainCurrencies = useAddCurrenciesStore().possibleMainCurrencies
    const secondaryCurrencies = useAddCurrenciesStore().possibleSecondaryCurrencies
    const changeMainCurrency = useAddCurrenciesStore().changeMainCurrency
    const changeSecondaryCurrency = useAddCurrenciesStore().changeSecondaryCurrency
    const currentSecondaryCurrency = useAddCurrenciesStore().currentSecondaryCurrency
    const currentMainCurrency = useAddCurrenciesStore().currentMainCurrency
    const isProcessing = useAddCurrenciesStore().isProcessing
    const isDataCorrect = useAddCurrenciesStore().isDataCorrect
    const createNewCurrencyConfig = useAddCurrenciesStore().createNewCurrencyConfig

    const navigation = useNavigation();

    return (
        <View style={{padding: 15, flexGrow: 1}}>
            <View style={styles.content}/>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <SecondaryText>Main currency:</SecondaryText>
                <CurrencyPicker options={mainCurrencies} onSelect={changeMainCurrency} selected={currentMainCurrency}
                                isActive={!isProcessing}/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center", flexGrow: 1}}>
                <Octicons name="arrow-switch" size={54} color={style === "dark" ? "white" : "black"}/>
            </View>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <SecondaryText>Secondary currency:</SecondaryText>
                <CurrencyPicker options={secondaryCurrencies} onSelect={changeSecondaryCurrency}
                                selected={currentSecondaryCurrency} isActive={!isProcessing}/>
            </View>
            <View style={styles.content}/>
            <NormalButton text={"Create"} isActive={isDataCorrect && !isProcessing} isProcessing={isProcessing}
                          onPress={() => createNewCurrencyConfig(auth, firestore, navigation)}/>
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
