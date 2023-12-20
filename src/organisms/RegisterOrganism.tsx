import React, {FC} from "react";
import {Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";
import {AUTH_SUCCESS, useStore} from "../store/authenticatonStore";
import {DataModal} from "../atoms/DataModal";
import {NormalText} from "../topography/NormalText";
import {SecondaryText} from "../topography/SecondaryText";

export const RegisterOrganism: FC<{}> = () => {
    const data = useStore((state) => state.registerData);
    const changeRegisterEmail = useStore((state) => state.changeRegisterEmail);
    const changeRegisterPassword = useStore((state) => state.changeRegisterPassword);
    const changeRepeatRegisterPassword = useStore((state) => state.changeRepeatRegisterPassword);
    const registerWithEmailAndPassword = useStore((state) => state.registerUserWithEmailAndPassword);
    const closeRegisterUserModal = useStore((state) => state.closeRegisterUserModal);
    const navigateBackToLoginFromRegister = useStore((state) => state.navigateBackToLoginFromRegister);


    const renderModalBody = () => {
        switch (data.status) {
            case "auth/success":
                return (
                    <View>
                        <NormalText>Your account created successfully!</NormalText>
                        <View style={{padding: 5}}>
                            <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                                navigateBackToLoginFromRegister()
                            }}/>
                        </View>
                    </View>
                )
            case "auth/email-already-in-use":
                return (<View>
                    <NormalText>The provided email is already in used!</NormalText>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            case "auth/invalid-email":
                return (<View>
                    <NormalText>The provided email is invalid!</NormalText>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            case "auth/weak-password":
                return (<View>
                    <NormalText>The provided password is to weak!</NormalText>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            case "auth/missing-password":
                return (<View>
                    <NormalText>The password is required!</NormalText>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            default:
                return (<View>
                    <NormalText>Unknown error occurred try again later!</NormalText>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
        }

    }

    let couldBeSend = data.password === data.repeatPassword

    return (<View style={{gap: 5}}>
        <SecondaryText>Input email:</SecondaryText>
        <InputData value={data.email} isActive={!data.isProcessing} onChange={changeRegisterEmail}
                   keyboardType={"email-address"} placeholder={"Email"}
                   description={data.emailAnnotation != null ? data.emailAnnotation : null}/>
        <SecondaryText>Input password:</SecondaryText>
        <InputData value={data.password} isActive={!data.isProcessing} onChange={changeRegisterPassword}
                   secureText={true} placeholder={"Password"}
                   description={data.passwordAnnotation != null ? data.passwordAnnotation : null}/>
        <SecondaryText>Input password:</SecondaryText>
        <InputData value={data.repeatPassword} isActive={!data.isProcessing} onChange={changeRepeatRegisterPassword}
                   secureText={true}
                   placeholder={"Repeat password"}
                   description={data.repeatPasswordAnnotation != null ? data.repeatPasswordAnnotation : null}
        />
        <NormalButton isActive={!data.isProcessing && couldBeSend} text={"Register"}
                      onPress={registerWithEmailAndPassword}
                      isProcessing={data.isProcessing}/>
        <DataModal title={data.status === AUTH_SUCCESS ? "Link send" : "Error"} onRequestClose={() => {
            if (data.status === AUTH_SUCCESS) {
                navigateBackToLoginFromRegister()
                return
            }
            closeRegisterUserModal()
        }} visible={data.status != null}>
            {renderModalBody()}
        </DataModal>
    </View>)
}
