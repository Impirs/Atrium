import "./css/Settings.css"

import React, { useEffect, useState } from "react"
import { render } from "../library/settings";

const ipcRenderer = (window as any).ipcRenderer;

const Settings: React.FC = () => {

    useEffect(() => {
        render({ target: "#settings" });
    }, []);

    return (
        <div className="s-screen">
            <div id="settings"></div>
        </div>
    );
};

export default Settings;