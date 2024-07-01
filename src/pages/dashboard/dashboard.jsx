import React from "react";
import Header from "./header";
import Intro from "./intro";
import Form from "./Form";

import 'bootstrap/dist/css/bootstrap.min.css';

function DashBoard() {
    return (
        <div className="">
            <Header />
            <Intro />
            <Form />
        </div>
    )
}

export default DashBoard;