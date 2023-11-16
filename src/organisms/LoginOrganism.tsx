import React, {FC} from "react";
import {Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";
import {useStore} from "../store/store";

export const LoginOrganism: FC<{}> = ({}) => {
    const login = useStore((state) => state.login);
    const changeLogin = useStore((state) => state.changeLogin);

    const password = useStore((state) => state.password);
    const changePassword = useStore((state) => state.changePassword);

    const loginWithEmailAndPassword = useStore((state) => state.loginWithEmailAndPassword);

    return (
        <View style={{gap: 5}}>
            <Text>Input email:</Text>
            <InputData value={login} keyboardType={"email-address"} onChange={(e) => changeLogin(e)}
                       placeholder={"Login"}/>
            <Text>Input Password:</Text>
            <InputData value={password} secureText={true} onChange={(e) => changePassword(e)}
                       placeholder={"Password"}/>
            <Text>Forget password? SEND EMAIL</Text>
            <NormalButton onPress={loginWithEmailAndPassword}>
                <Text style={{textAlign: "center"}}>Sign in</Text>
            </NormalButton>
            <Text>Haven't got account yet? REGISTER</Text>
        </View>
    );
};


