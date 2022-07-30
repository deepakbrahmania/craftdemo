import React from "react";
import { useLocation } from "react-router-dom";

export const NoMatchFound = () => {
    let location = useLocation();
    return <div>
        <h4>
            No Match Found For <code>{location.pathname}</code>
        </h4>
    </div>
}