import React, {FC} from "react";
import {Switch} from "react-native";
import {useSettingsStore} from "../store/settingsStore";

export const NormalSwitch: FC<{ value: boolean, onChange }> = ({value, onChange}) => {
    const style = useSettingsStore().data.style

    return <Switch value={value} onChange={onChange}
                   trackColor={{false: '#2d2d2d', true: '#c4c4c4'}}
                   thumbColor={style !== "dark" ? (value ? '#0c0909' : '#fff') : (!value ? '#070606' : '#fff')}
                   ios_backgroundColor="gray"
    />

}
