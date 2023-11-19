import React, {FC} from "react";
import {Text, View} from "react-native";
import {InputData} from "../atoms/InputData";
import {NormalButton} from "../atoms/NormalButton";

export const RegisterOrganism: FC<{}> = () => {


    return (<View style={{gap: 5}}>
        <Text>Input email:</Text>
        <InputData/>
        <Text>Input password:</Text>
        <InputData/>
        <Text>Input password:</Text>
        <InputData/>
        <NormalButton text={"Register"}/>
    </View>)
}
