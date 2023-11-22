import {StyleSheet, Text, View} from "react-native";
import {Octicons} from "@expo/vector-icons";
import {NormalButton} from "../atoms/NormalButton";
import React from "react";
import {CurrencyPicker} from "../molecules/CurrencyPicker";

export const CreateNewOrganism = () => {
    return (
        <View style={{padding: 15, flexGrow: 1}}>
            <View style={styles.content}/>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <Text>Main currency:</Text>
                <CurrencyPicker/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center", flexGrow: 1}}>
                <Octicons name="arrow-switch" size={54} color="black"/>
            </View>
            <View style={{justifyContent: "center", flexGrow: 1}}>
                <Text>Secondary currency:</Text>
                <CurrencyPicker/>
            </View>
            <View style={styles.content}/>
            <NormalButton text={"Create"}/>
        </View>
    )
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
