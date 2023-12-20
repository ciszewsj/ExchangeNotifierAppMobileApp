import {FC, useEffect, useState} from "react";
import {InputData} from "../atoms/InputData";
import {FlatList, View} from "react-native";
import {useHomePageStore} from "../store/homePageStore";
import {CurrencyLabel} from "../molecules/CurrencyLabel";
import {AntDesign} from '@expo/vector-icons';
import {useSettingsStore} from "../store/settingsStore";

export const HomePageOrganism: FC<{}> = () => {
    const style = useSettingsStore().data.style

    const notificationSettings = useHomePageStore().currencies

    const [searchedSettings, setSearchedSettings] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        setSearchedSettings(notificationSettings.filter(id => `${id.mainCurrency}-${id.secondaryCurrency}`.toUpperCase().includes(searchText.toUpperCase())))
    }, [searchText, notificationSettings])

    const toDisplay = searchedSettings.filter(id => id.mainCurrency != null && id.secondaryCurrency != null)


    return (
        <View style={{gap: 10, margin: 15}}>
            <InputData placeholder={"Find"} value={searchText} onChange={setSearchText} isActive={true} icon={
                <AntDesign name="search1" size={24} color={style === "dark" ? "white" : "black"}/>
            }/>
            <FlatList keyExtractor={(id, index) => String(index)}
                      data={toDisplay}
                      renderItem={({item: currency}) => <CurrencyLabel currency={currency}/>}
                      scrollEnabled={false}/>
        </View>
    )
}
