import React from "react";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
    return (
    <div>
        <p>This is out Layout</p>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/work">Work</a>
            </li>
        </ul>
        <Outlet />
    </div>
    );
};