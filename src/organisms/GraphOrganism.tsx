import {FC, useMemo} from "react";
import {Text, View} from "react-native";
import {Card} from "../topography/Card";
import {useGraphStore} from "../store/graphStore";
import {useRoute} from "@react-navigation/native";
import {Graph} from "../atoms/Graph";
import {NormalText} from "../topography/NormalText";

export const GraphOrganism: FC<{}> = () => {

    const route = useRoute()

    const {settings} = useMemo(() => route.params, []);

    const data = useGraphStore().data.converted
    const setInput = useGraphStore().setInput

    useMemo(() => {
        setInput({
            mainCurrency: settings.mainCurrency,
            secondCurrency: settings.secondaryCurrency,
            document: {
                exchangeRates: settings.current_values
            }
        })
    }, [settings])

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
                    <View style={{
                        backgroundColor: "white", padding: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                        borderRadius: 20
                    }}>
                        <NormalText>YEAR</NormalText>
                    </View>
                    <View style={{
                        backgroundColor: "white", padding: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                        borderRadius: 20
                    }}>
                        <NormalText>MONTH</NormalText>
                    </View>
                    <View style={{
                        backgroundColor: "white", padding: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                        borderRadius: 20
                    }}>
                        <NormalText>WEEK</NormalText>
                    </View>
                    <View style={{
                        backgroundColor: "white", padding: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                        borderRadius: 20
                    }}>
                        <NormalText>DAY</NormalText>
                    </View>
                </View>
            </View>
        </View>
    )
}
