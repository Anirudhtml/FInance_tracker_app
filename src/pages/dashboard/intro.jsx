import React from "react";
import './intro.css';

import { useUser } from "@clerk/clerk-react";

function Intro() {

    const { user } = useUser();

    if (!user) {
        return <div className="introContainer">
        <h1 className="intro">New here? Sign in to continue</h1>
    </div>
    }
    return (
        <div className="introContainer">
            <hr />
            <h1 className="intro">Welcome {user.firstName}! Here are your Finances:</h1>
            <hr />
        </div>
    )
}

export default Intro;