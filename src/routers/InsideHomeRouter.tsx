import {FC, useLayoutEffect} from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from "../pages/HomePage";
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {NotificationSettingsPage} from "../pages/NotificationSettingsPage";
import {ConverterPage} from "../pages/ConverterPage";
import {ExchangeRatePage} from "../pages/ExchangeRatePage";
import {CurrencySettings} from "../store/homePageStore";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const InsideHomeRouter: FC<{ route, navigation }> = ({route, navigation}) => {

    const values: CurrencySettings = route.params as CurrencySettings

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${values.mainCurrency}-${values.secondaryCurrency}`,
        });
    }, [navigation]);
    return (

        <AppViewTemplate>
            <Tab.Navigator>
                <Tab.Screen name="Rate" component={ExchangeRatePage} initialParams={{settings: values}}/>
                <Tab.Screen name="Convert" component={ConverterPage} initialParams={{settings: values}}/>
                <Tab.Screen name="Settings" component={NotificationSettingsPage} initialParams={{settings: values}}/>
            </Tab.Navigator>
        </AppViewTemplate>
    )
}

export const MainHomeRouter: FC<{}> = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage}/>
            <Stack.Screen name="EUR-USD" component={InsideHomeRouter}/>
        </Stack.Navigator>
    );
}
