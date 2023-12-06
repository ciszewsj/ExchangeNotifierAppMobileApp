import {FC, useEffect, useState} from "react";
import {View} from "react-native";
import {LineChart} from "react-native-gifted-charts";
import {itemType} from "react-native-gifted-charts/src/LineChart/types";

export const Graph: FC<{ data: itemType[] }> = ({data}) => {

    let [state, setState] = useState({x: 100, y: 100})
    const [minVal, setMinVal] = useState(0)
    const [maxVal, setMaxVal] = useState(0)
    const [isVisible, setVisible] = useState(false)

    const onLayout = (event) => {
        const {height, width} = event.nativeEvent.layout;
        setState({x: width - 80, y: height - 100})
        setVisible(true)
    }

    useEffect(() => {
        setMinVal(data.map(value => value.value).reduce((max, currentValue) => Math.min(max, currentValue), Infinity))
        setMaxVal(data.map(value => value.value).reduce((max, currentValue) => Math.max(max, currentValue), -Infinity))
    }, [data])

    const minPosition = minVal - 0.5 * (maxVal - minVal)
    const maxPosition = maxVal - minPosition + 0.5 * (maxVal - minVal)
    return (
        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}
              onLayout={onLayout}>
            {isVisible && <LineChart
                scrollToEnd={true}
                width={state.x}
                height={state.y}
                initialSpacing={0}
                data={data}
                maxValue={maxPosition}
                yAxisOffset={minPosition}
            />}
        </View>
    )
}
