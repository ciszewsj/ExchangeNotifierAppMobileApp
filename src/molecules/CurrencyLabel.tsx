import {FC, useEffect, useMemo} from "react";
import {Card} from "../topography/Card";
import {Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CurrencySettings, useHomePageStore} from "../store/homePageStore";
import {ExchangeRate, ExchangeRateDocument} from "../firebase/ExchangeRate";
import {auth, firestore} from "../firebase/firebase";
import {doc, onSnapshot} from "firebase/firestore";
import {PercentChangeMolecule} from "./PercentChange";
import {NormalText} from "../topography/NormalText";

export const CurrencyLabel: FC<{ currency: CurrencySettings }> = ({currency}) => {
    const nav = useNavigation();

    const updateCurrencyValues = useHomePageStore().updateCurrencyValues

    const findMaxElement = (values?: ExchangeRate[]) => {
        if (values == undefined || values.length === 0) {
            return null
        }
        return values.reduce((acc, val) => acc.date > val.date ? acc : val)
    }

    const findAverageElementYesterday = (values?: ExchangeRate[]): number | null => {
        if (values == undefined || values.length === 0) {
            return null
        }
        const twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
        const fortyEightHoursAgo = new Date(Date.now() - 2 * (24 * 60 * 60 * 1000));
        const filteredValues = values.filter(value => fortyEightHoursAgo <= value.date <= twentyFourHoursAgo);
        if (filteredValues.length === 0) {
            return null;
        }
        const sum = values.reduce((total, currentValue) => total + currentValue.rate, 0);
        return sum / values.length;
    }

    const value: ExchangeRate | null = findMaxElement(currency.current_values)
    const averageYesterday: number | null = findAverageElementYesterday(currency.current_values)


    const rateListener = useMemo(() => {
        if (!auth.currentUser || currency.mainCurrency == undefined || currency.secondaryCurrency == undefined) {
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
                            <NormalText>{currency.mainCurrency}-{currency.secondaryCurrency}</NormalText>
                        </View>
                        <View style={{justifyContent: "center"}}>
                            <NormalText>{value != null ? value.rate : "-"}</NormalText>
                        </View>
                        <PercentChangeMolecule
                            averageYesterday={averageYesterday != null ? averageYesterday : undefined}
                            current={value != null ? value.rate : undefined}/>
                    </View>
                </Card>
            </Pressable>
        </View>
    )
}
