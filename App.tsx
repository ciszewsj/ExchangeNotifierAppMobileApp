import {AuthenticationRouter} from "./src/routers/AuthenticationRouter";
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    return (
        <NavigationContainer>
            <AuthenticationRouter/>
        </NavigationContainer>
    );
}
