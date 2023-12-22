import React, {FC, useMemo} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useChangeNotificationStore} from "../../store/changeNotificationSettings";
import {ValuePicker} from "../../molecules/ValuePicker";
import {InputData} from "../../atoms/InputData";
import {NormalButton} from "../../atoms/NormalButton";
import {auth, firestore} from "../../firebase/firebase";
import {SecondaryText} from "../../topography/SecondaryText";

export const NotificationSettingsEditPage: FC<{
    back: () => void
}> = ({back}) => {

    const editNotification = useChangeNotificationStore().editNotification
    const changeCreateNotificationType = useChangeNotificationStore().changeEditNotificationType
    const eventCreate = useChangeNotificationStore().eventEdit
    const deleteNotifySettings = useChangeNotificationStore().deleteNotifySettings

    const renderForm = () => {
        switch (eventCreate.type_name) {
            case "VALUE":
                const valueAsText = () => {
                    return eventCreate.value % 1 === 0 ? eventCreate.value?.toFixed(1) : eventCreate.value.toString();
                }
                return (<View>
                    <SecondaryText>When value...</SecondaryText>
                    <ValuePicker options={["LOWER", "HIGHER"]} selected={eventCreate.type ? eventCreate.type : null}
                                 onSelect={(element) => {
                                     changeCreateNotificationType(
                                         eventCreate.type_name,
                                         eventCreate.hour,
                                         eventCreate.minute,
                                         eventCreate.value,
                                         eventCreate.percent,
                                         element as "LOWER" | "HIGHER",
                                         eventCreate.notificationType,
                                         eventCreate.period
                                     );
                                 }} isActive={true}/>
                    <SecondaryText>Value</SecondaryText>
                    <InputData keyboardType={"number-pad"} isActive={true} value={valueAsText()} onChange={e => {
                        const newFloat = parseFloat(e)
                        changeCreateNotificationType(
                            eventCreate.type_name,
                            eventCreate.hour,
                            eventCreate.minute,
                            !isNaN(newFloat) ? newFloat : eventCreate.value,
                            eventCreate.percent,
                            eventCreate.type,
                            eventCreate.notificationType,
                            eventCreate.period)
                    }}/>
                </View>)
            case "PERCENT":
                const percentAsText = () => {
                    return eventCreate.percent % 1 === 0 ? eventCreate.percent?.toFixed(1) : eventCreate.percent.toString();
                }
                return (
                    <View>
                        <SecondaryText>Percent change... </SecondaryText>
                        <InputData keyboardType={"numeric"} isActive={true} value={percentAsText()}
                                   onChange={
                                       (element) => {
                                           if (element.length > 0 && element[0] === '.') {
                                               element = element.replace(".", "-")
                                           }
                                           const newFloat = parseFloat(element)
                                           changeCreateNotificationType(
                                               eventCreate.type_name,
                                               eventCreate.hour,
                                               eventCreate.minute,
                                               eventCreate.value,
                                               !isNaN(newFloat) ? newFloat : eventCreate.percent,
                                               eventCreate.type,
                                               eventCreate.notificationType,
                                               eventCreate.period)
                                       }
                                   }
                        />
                        <SecondaryText>During period...</SecondaryText>
                        <ValuePicker isActive={true} options={["HOUR", "DAY", "WEEK", "MONTH"]}
                                     selected={eventCreate.period ? eventCreate.period : null}
                                     onSelect={(element) => {
                                         changeCreateNotificationType(
                                             eventCreate.type_name,
                                             eventCreate.hour,
                                             eventCreate.minute,
                                             eventCreate.value,
                                             eventCreate.percent,
                                             eventCreate.type,
                                             eventCreate.notificationType,
                                             element as "HOUR" | "DAY" | "WEEK" | "MONTH")
                                     }}/>
                    </View>
                )
            case "TIME":
                const numberToTime = (time: number) => {
                    if (time === 0) {
                        return ""
                    }
                    return time.toFixed(0)
                }
                return (<View>
                    <SecondaryText>Notify at hour...</SecondaryText>
                    <InputData keyboardType={"numeric"} isActive={true}
                               value={eventCreate.hour ? numberToTime(eventCreate.hour) : ""}
                               onChange={(element) => {
                                   let newHour = parseInt(element)
                                   if (newHour > 24) {
                                       newHour = 24
                                   } else if (newHour < 0) {
                                       newHour = 0
                                   }
                                   changeCreateNotificationType(
                                       eventCreate.type_name,
                                       !isNaN(newHour) ? newHour : eventCreate.hour,
                                       eventCreate.minute,
                                       eventCreate.value,
                                       eventCreate.percent,
                                       eventCreate.type,
                                       eventCreate.notificationType,
                                       eventCreate.period
                                   )
                               }}/>
                    <SecondaryText>Notify at minute...</SecondaryText>
                    <InputData keyboardType={"numeric"} isActive={true}
                               value={eventCreate.minute ? numberToTime(eventCreate.minute) : ""}
                               onChange={(element) => {
                                   let newMinute = parseInt(element)
                                   if (newMinute > 59) {
                                       newMinute = 59
                                   } else if (newMinute < 0) {
                                       newMinute = 0
                                   }
                                   changeCreateNotificationType(
                                       eventCreate.type_name,
                                       eventCreate.hour,
                                       !isNaN(newMinute) ? newMinute : eventCreate.minute,
                                       eventCreate.value,
                                       eventCreate.percent,
                                       eventCreate.type,
                                       eventCreate.notificationType,
                                       eventCreate.period
                                   )
                               }}/>
                </View>)
            default:
                return (<View/>)
        }
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <View>
                    <View style={{padding: 5}}>

                        <SecondaryText>Notify when...</SecondaryText>
                        <ValuePicker options={["TIME", "PERCENT", "VALUE"]}
                                     selected={eventCreate.type_name != null ? eventCreate.type_name : null}
                                     onSelect={(e) => {
                                         changeCreateNotificationType(e as "TIME" | "PERCENT" | "VALUE",
                                             eventCreate.hour,
                                             eventCreate.minute,
                                             eventCreate.value,
                                             eventCreate.percent,
                                             eventCreate.type,
                                             eventCreate.notificationType,
                                             eventCreate.period)
                                     }} isActive={true}/>
                    </View>
                    {renderForm()}
                </View>
            </View>
            <View style={{padding: 5}}>
                <NormalButton text={"Delete"} isActive={!eventCreate.isProcessing}
                              isProcessing={eventCreate.isProcessing} onPress={() => {
                    if (eventCreate != undefined && eventCreate.uuid != null) {
                        deleteNotifySettings(eventCreate.uuid, auth, firestore, back)
                    }
                }}/>
            </View><View style={{padding: 5}}>
            <NormalButton text={"OK"} isActive={eventCreate.isDataCorrect && !eventCreate.isProcessing}
                          isProcessing={eventCreate.isProcessing} onPress={() => {
                editNotification(auth, firestore, back)
            }}/>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    greenSection: {
        flex: 1,
        padding: 5,
    },
    purpleSection: {
        padding: 5,
    },
});
