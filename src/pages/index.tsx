import SignUp from "@/components/shared/signUp";
import Login from "@/components/shared/login";
import React, { useState } from "react";
import ForgotPassword from "@/components/shared/forgotPassword";
import ResentPassword from "@/components/shared/resentPassword";

export default function Registration() {
    const [signUp, setSignup] = useState(false);
    const [login, setLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [isResent, setResent] = useState(false);

    const Handsignup = () => {
        setLogin(true);
        setSignup(false);
        setIsForgot(false);
    };

    const Handlelogin = () => {
        setLogin(false);
        setSignup(true);
        setIsForgot(false);
    };

    const HandleForgot = () => {
        setLogin(false);
        setSignup(false);
        setIsForgot(true);
    };

    const LinkForgot = () => {
        setLogin(false);
        setSignup(false);
        setIsForgot(true);
    };

    const LinkResent = () => {
        setLogin(false);
        setSignup(false);
        setIsForgot(false);
        setResent(true);
    };

    return (
        <div className="bg-[#dddd] min-h-screen">
            <div className="flex justify-center items-center gap-[20px] flex-col min-h-screen p-12 md:min-h-auto">
                {signUp && <SignUp signupCallback={Handsignup} />}
                {login && <Login pass={Handlelogin} forgot={LinkForgot} />}
                {isForgot && <ForgotPassword pass={HandleForgot} resent={LinkResent} />}
                {isResent && <ResentPassword pass={Handlelogin} />}
            </div>
        </div>
    );
}
