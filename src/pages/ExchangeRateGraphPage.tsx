import {FC} from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet
} from "react-native";
import {GraphOrganism} from "../organisms/GraphOrganism";

export const ExchangeRateGraphPage: FC<{}> = () => {
    return (
        <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <GraphOrganism/>
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
