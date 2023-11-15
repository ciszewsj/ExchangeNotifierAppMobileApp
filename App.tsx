import {StyleSheet, Text, View} from 'react-native';
import {LoginOrganism} from "./src/organisms/LoginOrganism";

export default function App() {
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
