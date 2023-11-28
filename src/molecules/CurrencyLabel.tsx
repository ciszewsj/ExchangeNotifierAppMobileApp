import {FC, useEffect, useMemo} from "react";
import {Card} from "../topography/Card";
import {Pressable, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {CurrencySettings, useHomePageStore} from "../store/homePageStore";
import {ExchangeRate, ExchangeRateDocument} from "../firebase/ExchangeRate";
import {auth, firestore} from "../firebase/firebase";
import {doc, onSnapshot} from "firebase/firestore";

export const CurrencyLabel: FC<{ currency: CurrencySettings }> = ({currency}) => {
    const nav = useNavigation();

    const updateCurrencyValues = useHomePageStore().updateCurrencyValues

    const findMaxElement = (values: ExchangeRate[]) => {
        if (values != null && values.length === 0) {
            return null
        }
        return values.reduce((acc, val) => acc.date > val.date ? acc : val)
    }

    const findMinElementToday = (values: ExchangeRate[]) => {
        if (values != null && values.length === 0) {
            return null
        }
        const twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
        const filteredValues = values.filter(value => value.date >= twentyFourHoursAgo);
        if (filteredValues.length === 0) {
            return null;
        }
        return filteredValues.reduce((maxValue, currentValue) =>
            currentValue.rate > maxValue.rate ? currentValue : maxValue
        );
    }

    const value: ExchangeRate | null = findMaxElement(currency.current_values)
    const minTodayValue: ExchangeRate | null = findMinElementToday(currency.current_values)


    const rateListener = useMemo(() => {
        if (!auth.currentUser) {
            return null
        }
        const documentRef = doc(firestore, currency.mainCurrency, currency.secondaryCurrency);
        return onSnapshot(documentRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data() as ExchangeRateDocument;
                updateCurrencyValues({
                    mainCurrency: currency.mainCurrency,
                    secondCurrency: currency.secondaryCurrency,
                    document: data
                })
            } else {
            }
        });
    }, [firestore, currency])

    useEffect(() => {
        const unsubscribe = rateListener
        if (!unsubscribe) {
            return
        }
        return () => {
            unsubscribe();
        };
    }, [rateListener])

    return (
        <View style={{margin: 5}}>
            <Pressable onPress={() => {
                nav.navigate("EUR-USD", {...currency})
            }}>
                <Card>
                    <View style={{flexDirection: "row", gap: 5}}>
                        <View style={{flex: 1, justifyContent: "center"}}>
                            <Text
                                style={{fontSize: 24}}>{currency.mainCurrency}-{currency.secondaryCurrency}</Text>
                        </View>
                        <View style={{justifyContent: "center"}}>
                            <Text style={{fontSize: 24}}>{value != null ? value.rate : "-"}</Text>
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <AntDesign name="caretup" size={24} color="green"/>
                            <Text>{value && minTodayValue != null ? minTodayValue.rate / value.rate * 100 - 100 : "-"}</Text>
                        </View>
                    </View>
                </Card>
            </Pressable>
        </View>
    )
}
