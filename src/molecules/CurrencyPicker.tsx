import {Pressable, View, Text, FlatList} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {DataModal} from "../atoms/DataModal";
import {useState} from "react";
import {InputData} from "../atoms/InputData";
import {Card} from "../topography/Card";

export const CurrencyPicker = () => {

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)}>
                <View style={{
                    backgroundColor: "#fff",
                    borderRadius: 50,
                    padding: 16,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 3,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            <Text>Dupa</Text>
                        </View>
                        <AntDesign name="caretdown" size={20} color="black"/>
                    </View>
                </View>
            </Pressable>
            <DataModal title={"Choose currency"} onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
                <View style={{padding: 5}}>
                    <InputData isActive={true} value={""} placeholder={"Currency name"}/>
                </View>
                <View style={{height: "80%", flexGrow: 1}}>
                    <FlatList data={[1]} renderItem={() => {
                        return <View style={{padding: 5}}>
                            <Card>
                                <Text>USD - Stany zjednoczone</Text>
                            </Card>
                        </View>
                    }}/>
                </View>
            </DataModal>
        </View>
    )
}
