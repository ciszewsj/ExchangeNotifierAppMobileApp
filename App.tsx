import 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {NotificationService} from "./src/organisms/NotificationContext";
import {Temp} from "./src/routers/Temp";
import {useSettingsStore} from "./src/store/settingsStore";


export default function App() {
    const style = useSettingsStore().data.style

    const dark = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: "white",
            background: "#202225",
            card: "black",
            text: "white",
            notification: "white",
            border: "black"
        }
    }
    const light = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            card: "white",
            primary: "black",
            text: "black",
            notification: "black",
            border: "white"

        }
    }

    return (
        <NavigationContainer theme={style === "dark" ? dark : light}>
            <Temp/>
            {/*<NotificationService/>*/}
        </NavigationContainer>
    );
}
