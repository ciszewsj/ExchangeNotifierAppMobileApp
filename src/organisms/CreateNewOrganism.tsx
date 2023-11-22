import {StyleSheet, Text, View} from "react-native";
import {Octicons} from "@expo/vector-icons";
import {NormalButton} from "../atoms/NormalButton";
import React from "react";
import {CurrencyPicker} from "../molecules/CurrencyPicker";
import {useAddNotificationStore} from "../store/addCurrenciesStore";
import {auth, firestore} from "../firebase/firebase";
import {useNavigation} from "@react-navigation/native";

export const CreateNewOrganism = () => {
    const mainCurrencies = useAddNotificationStore().possibleMainCurrencies
    const secondaryCurrencies = useAddNotificationStore().possibleSecondaryCurrencies
    const changeMainCurrency = useAddNotificationStore().changeMainCurrency
    const changeSecondaryCurrency = useAddNotificationStore().changeSecondaryCurrency
    const currentSecondaryCurrency = useAddNotificationStore().currentSecondaryCurrency
    const currentMainCurrency = useAddNotificationStore().currentMainCurrency
    const isProcessing = useAddNotificationStore().isProcessing
    const isDataCorrect = useAddNotificationStore().isDataCorrect
    const createNewCurrencyConfig = useAddNotificationStore().createNewCurrencyConfig

    const navigation = useNavigation();

    return (
        <View style={{padding: 15, flexGrow: 1}}>
            <View style={styles.content}/>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <Text>Main currency:</Text>
                <CurrencyPicker options={mainCurrencies} onSelect={changeMainCurrency} selected={currentMainCurrency}
                                isActive={!isProcessing}/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center", flexGrow: 1}}>
                <Octicons name="arrow-switch" size={54} color="black"/>
            </View>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <Text>Secondary currency:</Text>
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
