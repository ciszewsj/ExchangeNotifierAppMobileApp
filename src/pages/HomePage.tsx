import {FlatList, Pressable, ScrollView, Text, View} from "react-native";
import {FC} from "react";
import {Card} from "../topography/Card";
import {InputData} from "../atoms/InputData";
import {AntDesign} from '@expo/vector-icons';
import {AppViewTemplate} from "../templates/AppViewTemplate";
import {useNavigation} from "@react-navigation/native";
import {HomePageOrganism} from "../organisms/HomePageOrganism";


export const HomePage: FC<{}> = () => {
    return (
        <AppViewTemplate>
            <ScrollView>
                <HomePageOrganism/>
            </ScrollView>
        </AppViewTemplate>
    )
}
