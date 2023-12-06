import {FC, useMemo} from "react";
import {View} from "react-native";
import {Card} from "../topography/Card";
import {useGraphStore} from "../store/graphStore";
import {useRoute} from "@react-navigation/native";
import {Graph} from "../atoms/Graph";

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
        </View>
    )
}
