import {View, StyleSheet} from "react-native";
import {FC} from "react";

export const Card: FC<{
    children: FC;
}> = ({children}) => {
    return <View style={styles.cardContainer}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
});
