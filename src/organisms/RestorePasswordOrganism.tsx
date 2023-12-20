import React, {FC} from "react";
import {Text, View} from "react-native";
import {NormalButton} from "../atoms/NormalButton";
import {InputData} from "../atoms/InputData";
import {AUTH_SUCCESS, useStore} from "../store/authenticatonStore";
import {DataModal} from "../atoms/DataModal";
import {SecondaryText} from "../topography/SecondaryText";

export const RestorePasswordOrganism: FC<{}> = () => {
    const data = useStore((state) => state.resetPasswordData);
    const sendResetPasswordEmail = useStore((state) => state.sendResetPasswordEmail);
    const changeRestorePasswordEmail = useStore((state) => state.changeRestorePasswordEmail);
    const closeResetPasswordModal = useStore((state) => state.closeResetPasswordModal);
    const navigateBackToLoginFromRestore = useStore((state) => state.navigateBackToLoginFromRestore);


    const renderModalBody = () => {
        switch (data.status) {
            case "auth/success":
                return (
                    <View>
                        <SecondaryText>Check your email and follow next steps to reset your password.</SecondaryText>
                        <View style={{padding: 5}}>
                            <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                                navigateBackToLoginFromRestore()
                            }}/>
                        </View>
                    </View>
                )
            case "auth/invalid-email":
                return (
                    <View>
                        <SecondaryText>The provided email is invalid!</SecondaryText>
                        <View style={{padding: 5}}>
                            <NormalButton text={"Ok!"} isActive={true} isProcessing={false} onPress={() => {
                                closeResetPasswordModal()
                            }}/>
                        </View>
                    </View>
                )
            case "auth/missing-email":
                return (
                    <View>
                        <SecondaryText>Please provide valid email!</SecondaryText>
                        <View style={{padding: 5}}>
                            <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                                closeResetPasswordModal()
                            }}/>
                        </View>
                    </View>
                )
            case "auth/network-request-failed":
                return (
                    <View>
                        <SecondaryText>The network error occurred! Please try again later.</SecondaryText>
                        <View style={{padding: 5}}>
                            <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                                closeResetPasswordModal()
                            }}/>
                        </View>
                    </View>
                )
            default:
                return <View>
                    <SecondaryText>Unknown error has appeared!</SecondaryText>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeResetPasswordModal()
                        }}/>
                    </View>
                </View>
        }
    }

    return (
        <View style={{gap: 5}}>
            <SecondaryText>Input email:</SecondaryText>
            <InputData value={data.email}
                       placeholder={"email"}
                       keyboardType={"email-address"}
                       isActive={!data.isProcessing}
                       description={data.annotation != undefined ? data.annotation : null}
                       onChange={changeRestorePasswordEmail}/>
            <NormalButton text={"Send email"}
                          isProcessing={data.isProcessing}
                          isActive={!data.isProcessing}
                          onPress={() => {
                              sendResetPasswordEmail()
                          }}/>
            <DataModal title={data.status === AUTH_SUCCESS ? "Link send" : "Error"} onRequestClose={() => {
                if (data.status === AUTH_SUCCESS) {
                    navigateBackToLoginFromRestore()
                    return
                }
                closeResetPasswordModal()
            }} visible={data.status != null}>
                {renderModalBody()}
            </DataModal>

        </View>
    )
}
