import React, {FC} from "react";
import {ScrollView, Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";
import {useStore} from "../store/store";
import {Circle} from "../topography/Circle";

export const LoginOrganism: FC<{}> = ({}) => {
    const login = useStore((state) => state.login);
    const changeLogin = useStore((state) => state.changeLogin);

    const password = useStore((state) => state.password);
    const changePassword = useStore((state) => state.changePassword);

    return (
        <View style={{width: "100%", height: "100%",}}>
            <View style={{flex: 1}}>
                <Circle></Circle>
            </View>
            <View>
                <ScrollView>
                    <View style={{gap: 5, marginTop: 25, marginBottom: 25, marginHorizontal: 25, marginRight: 25}}>
                        <Text>Input email:</Text>
                        <InputData value={login} onChange={(e) => changeLogin(e)} placeholder={"Login"}/>
                        <Text>Input Password:</Text>
                        <InputData value={password} onChange={(e) => changePassword(e)} placeholder={"Password"}/>
                        <Text>Forget password? SEND EMAIL</Text>
                        <NormalButton>
                            <Text style={{textAlign: "center"}}>Sign in</Text>
                        </NormalButton>
                        <Text>Haven't got account yet? REGISTER</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
