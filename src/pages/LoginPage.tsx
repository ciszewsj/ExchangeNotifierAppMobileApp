import {MainMenuTemplate} from "../templates/MainMenuTemplate";
import {FC} from "react";
import {LoginOrganism} from "../organisms/LoginOrganism";

export const LoginPage: FC<{}> = () => {

    return (
        <MainMenuTemplate>
            <LoginOrganism/>
        </MainMenuTemplate>
    )
}
