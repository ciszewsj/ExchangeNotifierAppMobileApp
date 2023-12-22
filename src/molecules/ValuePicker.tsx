import {Pressable, View, Text, FlatList} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {DataModal} from "../atoms/DataModal";
import {FC, useState} from "react";
import {Card} from "../topography/Card";
import {useSettingsStore} from "../store/settingsStore";
import {SecondaryText} from "../topography/SecondaryText";

export const ValuePicker: FC<{
    options?: string[],
    selected: string | null,
    onSelect: (element: string) => void,
    isActive?: boolean
}> = ({options, selected, onSelect, isActive}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const style = useSettingsStore().data.style

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)}>
                <View style={[{
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
                }, style === "dark" && {
                    backgroundColor: "black"
                }, !isActive && {backgroundColor: "#D9D9D9"}

                ]}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            {selected == null ? <SecondaryText>Choose value...</SecondaryText> :
                                <SecondaryText>{selected}</SecondaryText>}
                        </View>
                        <AntDesign name="caretdown" size={20} color={style == "dark" ? "white" : "black"}/>
                    </View>
                </View>
            </Pressable>
            <DataModal title={"Choose currency"} onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
                <View style={{height: "75%", flexGrow: 1}}>
                    <FlatList
                        data={options}
                        renderItem={({item: currency}) => (
                            <View style={{padding: 5}}>
                                <Pressable onPress={() => {
                                    onSelect(currency)
                                    setModalVisible(false)
                                }}>
                                    <Card>

                                        <SecondaryText>{currency}</SecondaryText>
                                    </Card>
                                </Pressable>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </DataModal>
        </View>
    )
}
