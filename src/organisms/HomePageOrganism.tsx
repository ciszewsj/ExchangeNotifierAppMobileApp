import {FC, useEffect, useState} from "react";
import {InputData} from "../atoms/InputData";
import {FlatList, View} from "react-native";
import {useHomePageStore} from "../store/homePageStore";
import {CurrencyLabel} from "../molecules/CurrencyLabel";

export const HomePageOrganism: FC<{}> = () => {
    const notificationSettings = useHomePageStore().notification_settings

    const [searchedSettings, setSearchedSettings] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        setSearchedSettings(notificationSettings.filter(id => `${id.currencySymbol}-${id.secondCurrencySymbol}`.toUpperCase().includes(searchText.toUpperCase())))
    }, [searchText])

    return (
        <View style={{gap: 10, margin: 15}}>
            <InputData placeholder={"Find"} value={searchText} onChange={setSearchText} isActive={true}/>
            <FlatList keyExtractor={(id) => id.currencySymbol + "-" + id.secondCurrencySymbol}
                      data={searchedSettings}
                      renderItem={({item: currency}) => <CurrencyLabel currency={currency}/>}
                      scrollEnabled={false}/>
        </View>
    )
}
