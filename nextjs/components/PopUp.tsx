import { useContext } from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

import { MainContext } from './MainView';

export default function PopUp() {
    const mainContext = useContext(MainContext);
    const { popUp } = mainContext;

    return (
        <div className={"z-0? absolute bottom-10 transition-transform ease-in-out duration-300 transform " + (popUp.active ? "left-2 translate-x-0" : "left-0 -translate-x-full")}>
            <Alert status={popUp.status}>
                <AlertIcon />
                {popUp.message}
            </Alert>
        </div>
    );
}