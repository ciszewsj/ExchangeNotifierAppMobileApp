import {FC, useEffect, useState} from "react";
import {InputData} from "../atoms/InputData";
import {FlatList, View} from "react-native";
import {useHomePageStore} from "../store/homePageStore";
import {CurrencyLabel} from "../molecules/CurrencyLabel";

export const HomePageOrganism: FC<{}> = () => {
    const notificationSettings = useHomePageStore().currencies

    const [searchedSettings, setSearchedSettings] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        setSearchedSettings(notificationSettings.filter(id => `${id.mainCurrency}-${id.secondaryCurrency}`.toUpperCase().includes(searchText.toUpperCase())))
    }, [searchText, notificationSettings])

    const toDisplay = searchedSettings.filter(id => id.mainCurrency != null && id.secondaryCurrency != null)

    return (
        <View style={{gap: 10, margin: 15}}>
            <InputData placeholder={"Find"} value={toDisplay} onChange={setSearchText} isActive={true}/>
            <FlatList keyExtractor={(id) => id.currencySymbol + "-" + id.secondCurrencySymbol}
                      data={searchedSettings}
                      renderItem={({item: currency}) => <CurrencyLabel currency={currency}/>}
                      scrollEnabled={false}/>
        </View>
    )
}
