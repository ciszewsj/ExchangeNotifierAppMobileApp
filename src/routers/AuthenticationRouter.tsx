import {createStackNavigator} from '@react-navigation/stack';
import {LoginPage} from "../pages/LoginPage";
import {FC} from "react";
import {RegisterPage} from "../pages/RegisterPage";
import {RestorePasswordPage} from "../pages/RestorePasswordPage";
import {useNavigation} from "@react-navigation/native";
import {useStore} from "../store/authenticatonStore";

const Stack = createStackNavigator();

export const AuthenticationRouter: FC<{}> = () => {


    const navigation = useNavigation();
    console.log("bind navigation")
    const bindNavigation = useStore((state) => state.bindNavigation);
    bindNavigation(navigation);

    return (
        <Stack.Navigator initialRouteName="Screen1">
            <Stack.Screen name="Login" component={LoginPage}/>
            <Stack.Screen name="Register" component={RegisterPage}/>
            <Stack.Screen name="Restore password" component={RestorePasswordPage}/>
        </Stack.Navigator>
    )
}
