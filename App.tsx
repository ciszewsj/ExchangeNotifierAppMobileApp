import {StyleSheet, Text, View} from 'react-native';
import {LoginOrganism} from "./src/organisms/LoginOrganism";
import app from '@react-native-firebase/app'

export default function App() {
    app.initializeApp("")
    return (
        <View style={styles.container}>
            <LoginOrganism/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
