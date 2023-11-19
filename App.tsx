import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {Temp} from "./src/routers/Temp";


export default function App() {
    return (
        <NavigationContainer>
            <Temp/>
            {/*<AuthenticationRouter/>*/}
        </NavigationContainer>
    );
}
