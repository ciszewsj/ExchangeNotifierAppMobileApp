import {FC} from "react";
import {MainMenuTemplate} from "../templates/MainMenuTemplate";
import {RestorePasswordOrganism} from "../organisms/RestorePasswordOrganism";

export const RestorePasswordPage: FC<{}> = () => {

    return (
        <MainMenuTemplate>
            <RestorePasswordOrganism/>
        </MainMenuTemplate>
    )
}
