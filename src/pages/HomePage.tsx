import {ScrollView} from "react-native";
import {FC} from "react";
import {AppViewTemplate} from "../templates/AppViewTemplate";
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
