import {View} from "react-native";
import {FC} from "react";
import {useSettingsStore} from "../store/settingsStore";

export const Circle: FC<{ children?: any | undefined }> = ({children}) => {
    const style = useSettingsStore().data.style

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            maxHeight: 350
        }}>
            <View style={[{
                backgroundColor: "#D9D9D9",
                width: 250,
                height: 250,
                borderRadius: 250 / 2,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowRadius: 4,
                elevation: 3,
                shadowColor: "black",
                justifyContent: "center",
                alignItems: "center"
            },
                style === "dark" && {
                    backgroundColor: "#000",
                    shadowColor: "white",
                }
            ]}>
                {children}
            </View>
        </View>
    )
}
