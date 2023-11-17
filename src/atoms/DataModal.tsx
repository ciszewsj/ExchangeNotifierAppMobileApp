import {FC, useState} from "react";
import {Button, Modal, View, Text} from "react-native";
import {NormalText} from "../topography/NormalText";

export const DataModal: FC<{
    title: string,
    children?: any,
    onRequestClose: any,
    visible: boolean
}> = ({title, children, onRequestClose, visible}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onRequestClose}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
                <View style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 20,
                    minHeight: 100,
                    maxHeight: 500,
                    width: "80%",
                    minWidth: 200,
                    maxWidth: 400
                }}>
                    <View style={{flexDirection: "row", marginBottom: 5, alignItems: "center"}}>
                        <View style={{flex: 1}}>
                            <NormalText>{title}</NormalText>
                        </View>
                        <View style={{width: 30, height: 30, borderColor: "gray", borderWidth: 2, borderRadius: 15}}/>
                    </View>
                    <View style={{width: "100%", height: 1, backgroundColor: "black"}}/>
                    <View style={{flexGrow: 1, overflow: "hidden"}}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
