import {FC} from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

export const ApplicationRouter: FC<{}> = () => {
    return <Tab.Navigator>
        <Tab.Screen name="Home" component={View}/>
        <Tab.Screen name="New" component={View}/>
        <Tab.Screen name="Settings" component={View}/>
    </Tab.Navigator>
}
