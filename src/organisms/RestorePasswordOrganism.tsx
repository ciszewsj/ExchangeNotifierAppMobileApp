import React, {FC} from "react";
import {Text, View} from "react-native";
import {NormalButton} from "../atoms/NormalButton";
import {InputData} from "../atoms/InputData";
import {useStore} from "../store/authenticatonStore";

export const RestorePasswordOrganism: FC<{}> = () => {
    const data = useStore((state) => state.resetPasswordData);
    const sendResetPasswordEmail = useStore((state) => state.sendResetPasswordEmail);
    const changeRestorePasswordEmail = useStore((state) => state.changeRestorePasswordEmail);

    console.log(data)
    return (
        <View style={{gap: 5}}>
            <Text>Input email:</Text>
            <InputData value={data.email} placeholder={"email"} keyboardType={"email-address"}
                       onChange={changeRestorePasswordEmail}/>
            <NormalButton onPress={() => {
                sendResetPasswordEmail()
            }}>
                <Text style={{textAlign: "center"}}>Send email</Text>
            </NormalButton>
        </View>
    )
}
