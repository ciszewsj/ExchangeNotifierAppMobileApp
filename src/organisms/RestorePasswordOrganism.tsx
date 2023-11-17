import React, {FC} from "react";
import {Text, View} from "react-native";
import {NormalButton} from "../atoms/NormalButton";
import {InputData} from "../atoms/InputData";
import {useStore} from "../store/store";

export const RestorePasswordOrganism: FC<{}> = () => {
    const data = useStore((state) => state.resetPasswordData);
    const sendResetPasswordEmail = useStore((state) => state.sendResetPasswordEmail);

    return (
        <View style={{gap: 5}}>
            <Text>Input email:</Text>
            <InputData value={data.email} placeholder={"email"} keyboardType={"email-address"}/>
            <NormalButton onPress={()=> {
                sendResetPasswordEmail()
            }}>
                <Text style={{textAlign: "center"}}>Send email</Text>
            </NormalButton>
        </View>
    )
}
