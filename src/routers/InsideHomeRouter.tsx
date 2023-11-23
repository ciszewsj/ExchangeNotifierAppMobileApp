import {FC, useLayoutEffect} from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import {View} from "react-native";
import {HomePage} from "../pages/HomePage";
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {NotificationSettingEntity} from "../firebase/UserSettings";
import {NotificationSettingsPage} from "../pages/NotificationSettingsPage";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const InsideHomeRouter: FC<{ route, navigation }> = ({route, navigation}) => {

    const values: NotificationSettingEntity = route.params as NotificationSettingEntity

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${values.currencySymbol}-${values.secondCurrencySymbol}`,
        });
    }, [navigation]);
    return (

        <AppViewTemplate>
            <Tab.Navigator>
                <Tab.Screen name="Rate" component={View}/>
                <Tab.Screen name="Convert" component={View}/>
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
