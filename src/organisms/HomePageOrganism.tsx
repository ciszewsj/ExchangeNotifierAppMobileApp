import {FC} from "react";
import {InputData} from "../atoms/InputData";
import {FlatList, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useHomePageStore} from "../store/homePageStore";
import {CurrencyLabel} from "../molecules/CurrencyLabel";

export const HomePageOrganism: FC<{}> = () => {
    const nav = useNavigation()
    const notificationSettings = useHomePageStore().notification_settings

    return (
        <View style={{gap: 10, margin: 15}}>
            <InputData placeholder={"Find"} value={""} isActive={true}/>
            <FlatList keyExtractor={(id) => id.currencySymbol + "-" + id.secondCurrencySymbol}
                      data={notificationSettings}
                      renderItem={({item: currency}) => <CurrencyLabel currency={currency}/>}
                      scrollEnabled={false}/>
        </View>
    )
}
