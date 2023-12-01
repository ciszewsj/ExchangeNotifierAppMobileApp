import {FC} from "react";
import {Modal, View, Pressable} from "react-native";
import {NormalText} from "../topography/NormalText";
import {AntDesign} from '@expo/vector-icons';

export const DataModal: FC<{
    title: string,
    children?: any,
    onRequestClose: any,
    visible: boolean,
    backButton?: any | undefined
}> = ({title, children, onRequestClose, visible, backButton}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
                <View style={{
                    backgroundColor: '#F2F2F2',
                    padding: 20,
                    borderRadius: 20,
                    minHeight: 100,
                    maxHeight: 500,
                    width: "80%",
                    minWidth: 200,
                    maxWidth: 400
                }}>
                    <View style={{flexDirection: "row", marginBottom: 5, alignItems: "center"}}>
                        <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                            {backButton}
                            <NormalText>{title}</NormalText>
                        </View>
                        <View>
                            <Pressable onPress={onRequestClose}>
                                <AntDesign name="closecircleo" size={24} color="black"/>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{width: "100%", height: 1, backgroundColor: "black"}}/>
                    <View style={{flexGrow: 1, overflow: "hidden", marginTop: 5}}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
