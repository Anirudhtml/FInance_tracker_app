import React from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import './auth.css'


function Auth() {
    return (
        <div className="signInContainer">
                <SignedOut>
                    <SignInButton className="btn" mode="modal"/>
                    <SignUpButton className="btn" mode="modal"/>
                </SignedOut>

               <SignedIn>
                    <UserButton className='userBtn'/>
               </SignedIn>
        </div>
    )
}

export default Auth;