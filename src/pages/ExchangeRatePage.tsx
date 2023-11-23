import {FC, useEffect, useLayoutEffect, useState} from "react";
import {
    KeyboardAvoidingView,
    PanResponder,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Graph} from "../atoms/Graph";
import {Card} from "../topography/Card";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export const ExchangeRatePage: FC<{}> = () => {
    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View onStartShouldSetResponder={() => true}
                      style={{margin: 15, height: 400, maxWidth: 400, minWidth: 300}}>
                    <Card>
                        <Graph/>
                    </Card>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>)
}
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        margin: 0,
        padding: 0,
        width: "100%",
    },
    content: {
        flexGrow: 1,
        marginHorizontal: 0
    },
});
