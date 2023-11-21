import React, {FC} from "react";
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {KeyboardAvoidingView, ScrollView, View, StyleSheet, Text} from "react-native";
import {InputData} from "../atoms/InputData";
import {Octicons} from '@expo/vector-icons';
import {NormalButton} from "../atoms/NormalButton";

export const CreateNewPage: FC<{}> = () => {
    return (
        <AppViewTemplate>
            <KeyboardAvoidingView style={{width: "100%", height: "100%", justifyContent: "flex-end"}}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={{padding: 15, flexGrow: 1}}>
                        <View style={styles.content}/>
                        <View style={{justifyContent: "center", flexGrow: 1}}>
                            <Text>Main currency:</Text>
                            <InputData/>
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center", flexGrow: 1}}>
                            <Octicons name="arrow-switch" size={54} color="black"/>
                        </View>
                        <View style={{justifyContent: "center", flexGrow: 1}}>
                            <Text>Secondary currency:</Text>
                            <InputData/>
                        </View>
                        <View style={styles.content}/>
                        <NormalButton text={"Create"}/>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </AppViewTemplate>
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
