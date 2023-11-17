import {FC} from "react";
import {MainMenuTemplate} from "../templates/MainMenuTemplate";
import {RegisterOrganism} from "../organisms/RegisterOrganism";

export const RegisterPage: FC<{}> = () => {

    return (
        <MainMenuTemplate>
            <RegisterOrganism/>
        </MainMenuTemplate>
    )
}
