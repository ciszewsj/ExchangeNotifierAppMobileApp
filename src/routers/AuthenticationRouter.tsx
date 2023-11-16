import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginPage} from "../pages/LoginPage";
import {FC} from "react";

const Stack = createStackNavigator();

export const AuthenticationRouter: FC<{}> = () => {

    console.log("???")
    return (
        <Stack.Navigator  initialRouteName="Screen1">
            <Stack.Screen name="Login" component={LoginPage}/>
        </Stack.Navigator>
    )
}
