import {FC, useEffect, useState} from "react";
import {View} from "react-native";
import {LineChart} from "react-native-gifted-charts";
import {itemType} from "react-native-gifted-charts/src/LineChart/types";
import {useSettingsStore} from "../store/settingsStore";

export const Graph: FC<{ data: itemType[] }> = ({data}) => {
    const isDark = useSettingsStore().data.style === "dark"

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

    let minPosition = minVal - 0.5 * (maxVal - minVal)
    minPosition = minPosition < 0 ? 0 : minPosition
    const maxPosition = maxVal - minPosition + 0.5 * (maxVal - minVal)
    return (
        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}
              onLayout={onLayout}>
            {isVisible && <LineChart
                scrollToEnd={true}
                width={state.x}
                height={state.y}
                initialSpacing={60}
                endSpacing={60}
                data={data}
                maxValue={maxPosition}
                yAxisOffset={minPosition}
                showVerticalLines
                xAxisIndicesWidth={50}
                xAxisTextNumberOfLines={5}
                xAxisLabelsVerticalShift={10}
                spacing={90}
                xAxisLabelTextStyle={{width: 100, marginLeft: -25, color: isDark ? "white" : "black"}}
                focusedDataPointColor={isDark ? "white" : "black"}
                textColor1={isDark ? "white" : "black"}
                color={isDark ? "white" : "black"}
                dataPointsHeight={6}
                dataPointsWidth={6}
                textShiftY={-2}
                textShiftX={-5}
                textFontSize={13}
                yAxisColor={isDark ? "white" : "black"}
                xAxisColor={isDark ? "white" : "black"}
                yAxisTextStyle={{color: isDark ? "white" : "black"}}

            />}
        </View>
    )
}
