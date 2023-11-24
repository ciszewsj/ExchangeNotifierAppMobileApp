import {FC} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Fontisto} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {CreateNewPage} from "../pages/CreateNewPage";
import {SettingsPage} from "../pages/SettingsPage";
import {MainHomeRouter} from "./InsideHomeRouter";


const Tab = createBottomTabNavigator();

export const ApplicationRouter: FC<{}> = () => {
    return <Tab.Navigator>
        <Tab.Screen name="OutsideHome" component={MainHomeRouter} options={{
            tabBarIcon: ({color, size}) => <Fontisto name="money-symbol" size={size} color={color}/>,
            headerShown: false,
            tabBarLabel: "Home"
        }}/>
        <Tab.Screen name="New" component={CreateNewPage} options={{
            tabBarIcon: ({color, size}) => <Ionicons name="ios-add-circle-outline" size={size} color={color}/>
        }}/>
        <Tab.Screen name="Settings" component={SettingsPage} options={{
            tabBarIcon: ({color, size}) => <Ionicons name="settings-outline" size={size} color={color}/>
        }}/>
    </Tab.Navigator>
}
