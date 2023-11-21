import {FlatList, Pressable, ScrollView, Text, View} from "react-native";
import {FC} from "react";
import {Card} from "../topography/Card";
import {InputData} from "../atoms/InputData";
import {AntDesign} from '@expo/vector-icons';
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {useNavigation} from "@react-navigation/native";


export const HomePage: FC<{}> = () => {
    const nav = useNavigation()
    return (
        <AppViewTemplate>
            <ScrollView>
                <View style={{gap: 10, margin: 15}}>
                    <InputData placeholder={"Find"} value={""} isActive={true}/>
                    <FlatList keyExtractor={(id) => id} data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} renderItem={(item) => {
                        return (
                            <Pressable onPress={() => {
                                nav.navigate("EUR-USD", {})
                            }}>
                                <Card>
                                    <View style={{flexDirection: "row", gap: 5}}>
                                        <View style={{flex: 1, justifyContent: "center"}}>
                                            <Text style={{fontSize: 24}}>EUR-USD</Text>
                                        </View>
                                        <View style={{justifyContent: "center"}}>
                                            <Text style={{fontSize: 24}}>1.09</Text>
                                        </View>
                                        <View style={{justifyContent: "center", alignItems: "center"}}>
                                            <AntDesign name="caretup" size={24} color="green"/>
                                            <Text>-50.0%</Text>
                                        </View>
                                    </View>
                                </Card>
                            </Pressable>)
                    }} scrollEnabled={false} ItemSeparatorComponent={() => <View style={{marginTop: 15}}/>}/>
                </View>
            </ScrollView>
        </AppViewTemplate>
    )
}
