import {FC, useMemo} from "react";
import {View} from "react-native";
import {Card} from "../topography/Card";
import {ConvertDataOptions, useGraphStore} from "../store/graphStore";
import {useRoute} from "@react-navigation/native";
import {Graph} from "../atoms/Graph";
import {NormalText} from "../topography/NormalText";
import {Selector} from "../atoms/Selector";

export const GraphOrganism: FC = () => {

    const route = useRoute()
    const {settings} = useMemo(() => route.params, []);

    const data = useGraphStore().data.converted
    const type = useGraphStore().data.type
    const setInput = useGraphStore().setInput
    const convertData = useGraphStore().convertData

    useMemo(() => {
        setInput({
            mainCurrency: settings.mainCurrency,
            secondCurrency: settings.secondaryCurrency,
            document: {
                exchangeRates: settings.current_values
            }
        })
    }, [settings])

    const options: ConvertDataOptions[] = ["MONTH", "DAY", "HOUR"]

    return (
        <View onStartShouldSetResponder={() => true}
              style={{margin: 15, height: 400, maxWidth: 400, minWidth: 300}}>
            <Card>
                <Graph data={data}/>
            </Card>
            <View style={{marginTop: 10,}}>
                <NormalText>Period</NormalText>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    flexWrap: "wrap"
                }}>
                    {options.map(option => <Selector onPress={() => convertData(option)} isActive={type === option}
                                                     text={option}/>)}
                </View>
            </View>
        </View>
    )
}
