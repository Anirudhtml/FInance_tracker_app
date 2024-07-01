import React from "react";
import './header.css'

import Auth from "../auth/auth";


function Header() {
    return <div className="headerContainer">
        <span className="tagLine">finance.co</span>
        <div  className='userButton'>
            <Auth/>
        </div> 
    </div>
}

export default Header;