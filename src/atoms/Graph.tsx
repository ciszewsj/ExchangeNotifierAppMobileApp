import {FC, useState} from "react";
import {View} from "react-native";
import {LineChart} from "react-native-gifted-charts";

export const Graph: FC<{}> = () => {

    const data = [{value: 4.5, label: "dupa"}, {value: 5.0, label: "dupa1"}, {value: 2.4}, {value: 3.5, label: "dupa"},
        {value: 4.5, label: "dupa2"}, {value: 5.0, label: "dupa3"}, {value: 2.4, label: "dupa5"}, {
            value: 3.5,
            label: "dupa6"
        },
        {value: 4.5, label: "dupa"}, {value: 5.0, label: "dupa1"}, {value: 2.4}, {value: 3.5, label: "dupa"},
        {value: 4.5, label: "dupa2"}, {value: 5.0, label: "dupa3"}, {value: 2.4, label: "dupa5"}, {
            value: 3.5,
            label: "dupa6"
        },
        {value: 4.5, label: 0}, {value: 5.0, label: "dupa1"}, {value: 2.4}, {value: 3.5, label: "dupa"},
        {value: 4.5, label: "dupa2"}, {value: 5.0, label: "dupa3"}, {value: 2.4, label: "dupa5"}, {
            value: 3.5,
            label: "dupa6"
        },
        {value: 4.5, label: "dupa7"}, {value: 5.0, label: "dupa"}, {value: 2.4, label: "dupa"}, {
            value: 3.5,
            label: "dupa"
        }]

    let [state, setState] = useState({x: 100, y: 100})

    const onLayout = (event) => {
        const {x, y, height, width} = event.nativeEvent.layout;
        setState({x: width - 80, y: height - 100})
    }

    return (
        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}
              onLayout={onLayout}>
            <LineChart
                width={state.x}
                height={state.y}
                initialSpacing={0}
                data={data}
                textColor1="yellow"
                textShiftY={-8}
                textShiftX={-10}
                textFontSize={13}
                thickness={5}
                yAxisColor="#0BA5A4"
                // showVerticalLines
                // verticalLinesColor="rgba(14,164,164,0.5)"
                xAxisColor="#0BA5A4"
                color="#0BA5A4"
                spacing={(state.x) / data.length}
                focusEnabled
                showStripOnFocus
                showTextOnFocus
                showXAxisIndices
                disableScroll
                // disableScroll
            />
        </View>
    )
}
