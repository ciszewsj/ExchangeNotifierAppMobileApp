import {Pressable, View, Text, FlatList, StyleSheet} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {DataModal} from "../atoms/DataModal";
import {FC, useEffect, useMemo, useState} from "react";
import {InputData} from "../atoms/InputData";
import {Card} from "../topography/Card";
import {CurrencyElement} from "../store/addCurrenciesStore";
import {useSettingsStore} from "../store/settingsStore";
import {SecondaryText} from "../topography/SecondaryText";

export const CurrencyPicker: FC<{
    options?: CurrencyElement[],
    selected: CurrencyElement | null,
    onSelect: (element: CurrencyElement) => void,
    isActive?: boolean
}> = ({options, selected, onSelect, isActive}) => {
    const style = useSettingsStore().data.style

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
                <View
                    style={[styles.classic, style === "dark" && styles.darkMode, !isActive && {backgroundColor: "#D9D9D9"}]}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            {selected == null ? <SecondaryText>Choose currency...</SecondaryText> :
                                <SecondaryText>{currencyToString(selected)}</SecondaryText>}
                        </View>
                        <AntDesign name="caretdown" size={20} color={style !== "dark" ? "black" : "white"}/>
                    </View>
                </View>
            </Pressable>
            <DataModal title={"Choose currency"} onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
                <View style={{padding: 5}}>
                    <InputData isActive={true} value={search} placeholder={"Currency name"} onChange={setSearch}
                               icon={<AntDesign name="search1" size={24} color={style === "dark" ? "white" : "black"}/>}
                    />
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
                                        <SecondaryText>{currencyToString(currency)}</SecondaryText>
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
const styles = StyleSheet.create({
    classic: {
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
    },
    darkMode: {
        backgroundColor: "#000",
        shadowColor: "#fff",
    }
})
