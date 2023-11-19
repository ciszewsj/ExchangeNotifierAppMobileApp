import React, {FC} from "react";
import {Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";
import {useStore} from "../store/authenticatonStore";
import {TextButton} from "../atoms/TextButton";
import {DataModal} from "../atoms/DataModal";

export const LoginOrganism: FC<{}> = ({}) => {
    const data = useStore((state) => state.loginData);

    const changeLogin = useStore((state) => state.changeLogin);
    const changePassword = useStore((state) => state.changePassword);
    const loginWithEmailAndPassword = useStore((state) => state.loginWithEmailAndPassword);
    const closeLoginModal = useStore((state) => state.closeLoginModal);

    const navigateToRegister = useStore((state) => state.navigateToRegister);
    const navigateToRestorePassword = useStore((state) => state.navigateToRestorePassword);

    console.log(data)

    const renderModal = () => {
        switch (data.status) {
            case "auth/invalid-login-credentials":
                return (
                    <View>
                        <Text>Invalid email or password!</Text>
                        <View style={{padding: 5}}>
                            <NormalButton text={"Ok!"} isActive={true} isProcessing={false} onPress={() => {
                                closeLoginModal()
                            }}/>
                        </View>
                    </View>
                )
            case "auth/missing-password":
                return (<View>
                    <Text>Missing password!</Text>
                    <View style={{padding: 5}}>
                        <NormalButton text={"Ok!"} isActive={true} isProcessing={false} onPress={() => {
                            closeLoginModal()
                        }}/>
                    </View>
                </View>)
            case "auth/invalid-email":
                return (
                    <View>
                        <Text>The provided email is invalid!</Text>
                        <View style={{padding: 5}}>
                            <NormalButton text={"Ok!"} isActive={true} isProcessing={false} onPress={() => {
                                closeLoginModal()
                            }}/>
                        </View>
                    </View>
                )
            default:
                return <View>
                    <Text>Unknown error has appeared!</Text>
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
            <Text>Input email:</Text>
            <InputData value={data.email} keyboardType={"email-address"} onChange={(e) => changeLogin(e)}
                       placeholder={"Email"} isActive={!data.isProcessing}
                       description={data.emailAnnotation != null ? data.emailAnnotation : null}/>
            <Text>Input Password:</Text>
            <InputData value={data.password} secureText={true} onChange={(e) => changePassword(e)}
                       placeholder={"Password"} isActive={!data.isProcessing}
                       description={data.passwordAnnotation != null ? data.passwordAnnotation : null}/>
            <Text>Forget password?&nbsp;
                <TextButton text={"SEND EMAIL"}
                            onPress={() => navigateToRestorePassword()}/>
            </Text>
            <NormalButton onPress={loginWithEmailAndPassword} text={"Sign in"} isActive={!data.isProcessing}
                          isProcessing={data.isProcessing}/>
            <Text>Haven't got account yet?&nbsp;
                <TextButton text={"REGISTER"}
                            onPress={() => navigateToRegister()}/>
            </Text>
            <DataModal visible={data.status != null} title={"Login error"} onRequestClose={closeLoginModal}>
                {renderModal()}
            </DataModal>
        </View>
    );
};


