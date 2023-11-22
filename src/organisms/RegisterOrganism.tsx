import React, {FC} from "react";
import {Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";
import {AUTH_SUCCESS, useStore} from "../store/authenticatonStore";
import {DataModal} from "../atoms/DataModal";

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
                        <Text>Your account created successfully!</Text>
                        <View style={{padding: 5}}>
                            <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                                navigateBackToLoginFromRegister()
                            }}/>
                        </View>
                    </View>
                )
            case "auth/email-already-in-use":
                return (<View>
                    <Text>The provided email is already in used!</Text>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            case "auth/invalid-email":
                return (<View>
                    <Text>The provided email is invalid!</Text>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            case "auth/weak-password":
                return (<View>
                    <Text>The provided password is to weak!</Text>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            case "auth/missing-password":
                return (<View>
                    <Text>The password is required!</Text>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeRegisterUserModal()
                        }}/>
                    </View>
                </View>)
            default:
                return (<View>
                    <Text>Unknown error occurred try again later!</Text>
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
        <Text>Input email:</Text>
        <InputData value={data.email} isActive={!data.isProcessing} onChange={changeRegisterEmail}
                   keyboardType={"email-address"} placeholder={"Email"}
                   description={data.emailAnnotation != null ? data.emailAnnotation : null}/>
        <Text>Input password:</Text>
        <InputData value={data.password} isActive={!data.isProcessing} onChange={changeRegisterPassword}
                   secureText={true} placeholder={"Password"}
                   description={data.passwordAnnotation != null ? data.passwordAnnotation : null}/>
        <Text>Input password:</Text>
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
