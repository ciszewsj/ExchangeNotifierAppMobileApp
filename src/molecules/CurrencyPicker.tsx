import {Pressable, View, Text, FlatList} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {DataModal} from "../atoms/DataModal";
import {FC, useEffect, useMemo, useState} from "react";
import {InputData} from "../atoms/InputData";
import {Card} from "../topography/Card";
import {CurrencyElement} from "../store/addCurrenciesStore";

export const CurrencyPicker: FC<{
    options?: CurrencyElement[],
    selected: CurrencyElement | null,
    onSelect: (element: CurrencyElement) => void,
    isActive?: boolean
}> = ({options, selected, onSelect, isActive}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [search, setSearch] = useState("")
    const [searchedList, setSearchedList] = useState([])


    const currencyToString = (opt) => {
        if (opt == null) {
            return ""
        }
        return `${opt.symbol} - ${opt.currency}`;
    };


    useEffect(() => {
        setSearchedList(options.filter(option => {
            return currencyToString(option).toUpperCase().includes(search.toUpperCase())
        }))
    }, [search, options])


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
                }, !isActive && {backgroundColor: "#D9D9D9"}]}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            {selected == null ? <Text>Choose currency...</Text> :
                                <Text>{currencyToString(selected)}</Text>}
                        </View>
                        <AntDesign name="caretdown" size={20} color="black"/>
                    </View>
                </View>
            </Pressable>
            <DataModal title={"Choose currency"} onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
                <View style={{padding: 5}}>
                    <InputData isActive={true} value={search} placeholder={"Currency name"} onChange={setSearch}/>
                </View>
                <View style={{height: "75%", flexGrow: 1}}>
                    <FlatList
                        data={searchedList}
                        renderItem={({item: currency}) => (
                            <View style={{padding: 5}}>
                                <Pressable onPress={() => {
                                    onSelect(currency)
                                    setModalVisible(false)
                                }}>
                                    <Card>
                                        <Text>{currencyToString(currency)}</Text>
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
