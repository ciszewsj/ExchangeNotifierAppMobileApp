import React, {FC} from "react";
import {Switch} from "react-native";

export const NormalSwitch: FC<{ value: boolean, onChange }> = ({value, onChange}) => {
    return <Switch value={value} onChange={onChange}
                   trackColor={{false: '#F2F2F2', true: 'gray'}}
                   ios_backgroundColor="gray"
    />

}
