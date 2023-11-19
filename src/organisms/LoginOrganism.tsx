import React, {FC} from "react";
import {Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";
import {useStore} from "../store/authenticatonStore";
import {TextButton} from "../atoms/TextButton";
import {DataModal} from "../atoms/DataModal";
import {ButtonText} from "../topography/ButtonText";

export const LoginOrganism: FC<{}> = ({}) => {
    const login = useStore((state) => state.loginData.email);
    const changeLogin = useStore((state) => state.changeLogin);

    const password = useStore((state) => state.loginData.password);
    const changePassword = useStore((state) => state.changePassword);

    const loginWithEmailAndPassword = useStore((state) => state.loginWithEmailAndPassword);

    const navigateToRegister = useStore((state) => state.navigateToRegister);
    const navigateToRestorePassword = useStore((state) => state.navigateToRestorePassword);


    return (
        <View style={{gap: 5}}>
            <Text>Input email:</Text>
            <InputData value={login} keyboardType={"email-address"} onChange={(e) => changeLogin(e)}
                       placeholder={"Email"}/>
            <Text>Input Password:</Text>
            <InputData value={password} secureText={true} onChange={(e) => changePassword(e)}
                       placeholder={"Password"}/>
            <Text>Forget password?&nbsp;
                <TextButton text={"SEND EMAIL"}
                            onPress={() => navigateToRestorePassword()}/>
            </Text>
            <NormalButton onPress={loginWithEmailAndPassword} text={"Sign in"}/>
            <Text>Haven't got account yet?&nbsp;
                <TextButton text={"REGISTER"}
                            onPress={() => navigateToRegister()}/>
            </Text>
            <DataModal visible={false} title={"Login error"}>
                <Text>Problem during log in</Text>
                <NormalButton text={"Ok!"}/>
            </DataModal>
        </View>
    );
};


