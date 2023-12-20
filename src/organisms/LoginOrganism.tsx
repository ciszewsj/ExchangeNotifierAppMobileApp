import React, {FC} from "react";
import {Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";
import {useStore} from "../store/authenticatonStore";
import {TextButton} from "../atoms/TextButton";
import {DataModal} from "../atoms/DataModal";
import {SecondaryText} from "../topography/SecondaryText";

export const LoginOrganism: FC<{}> = ({}) => {
    const data = useStore((state) => state.loginData);

    const changeLogin = useStore((state) => state.changeLogin);
    const changePassword = useStore((state) => state.changePassword);
    const loginWithEmailAndPassword = useStore((state) => state.loginWithEmailAndPassword);
    const closeLoginModal = useStore((state) => state.closeLoginModal);

    const navigateToRegister = useStore((state) => state.navigateToRegister);
    const navigateToRestorePassword = useStore((state) => state.navigateToRestorePassword);


    const renderModal = () => {
        switch (data.status) {
            case "auth/invalid-login-credentials":
                return (
                    <View>
                        <SecondaryText>Invalid email or password!</SecondaryText>
                        <View style={{padding: 5}}>
                            <NormalButton text={"Ok!"} isActive={true} isProcessing={false} onPress={() => {
                                closeLoginModal()
                            }}/>
                        </View>
                    </View>
                )
            case "auth/missing-password":
                return (<View>
                    <SecondaryText>Missing password!</SecondaryText>
                    <View style={{padding: 5}}>
                        <NormalButton text={"Ok!"} isActive={true} isProcessing={false} onPress={() => {
                            closeLoginModal()
                        }}/>
                    </View>
                </View>)
            case "auth/invalid-email":
                return (
                    <View>
                        <SecondaryText>The provided email is invalid!</SecondaryText>
                        <View style={{padding: 5}}>
                            <NormalButton text={"Ok!"} isActive={true} isProcessing={false} onPress={() => {
                                closeLoginModal()
                            }}/>
                        </View>
                    </View>
                )
            default:
                return <View>
                    <SecondaryText>Unknown error has appeared!</SecondaryText>
                    <View style={{padding: 5}}>
                        <NormalButton text="Ok!" isActive={true} isProcessing={false} onPress={() => {
                            closeLoginModal()
                        }}/>
                    </View>
                </View>
        }
    }

    return (
        <View style={{gap: 5}}>
            <SecondaryText>Input email:</SecondaryText>
            <InputData value={data.email} keyboardType={"email-address"} onChange={(e) => changeLogin(e)}
                       placeholder={"Email"} isActive={!data.isProcessing}
                       description={data.emailAnnotation != null ? data.emailAnnotation : null}/>
            <SecondaryText>Input Password:</SecondaryText>
            <InputData value={data.password} secureText={true} onChange={(e) => changePassword(e)}
                       placeholder={"Password"} isActive={!data.isProcessing}
                       description={data.passwordAnnotation != null ? data.passwordAnnotation : null}/>
            <SecondaryText>Forget password?&nbsp;
                <TextButton text={"SEND EMAIL"}
                            onPress={() => navigateToRestorePassword()}/>
            </SecondaryText>
            <NormalButton onPress={loginWithEmailAndPassword} text={"Sign in"} isActive={!data.isProcessing}
                          isProcessing={data.isProcessing}/>
            <SecondaryText>Haven't got account yet?&nbsp;
                <TextButton text={"REGISTER"}
                            onPress={() => navigateToRegister()}/>
            </SecondaryText>
            <DataModal visible={data.status != null} title={"Login error"} onRequestClose={closeLoginModal}>
                {renderModal()}
            </DataModal>
        </View>
    );
};


