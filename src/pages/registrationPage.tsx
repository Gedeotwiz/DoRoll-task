
import SignUp from "@/components/shared/signUp"
import Login from "@/components/shared/login"
import React,{useState} from "react"
import ForgotPassword from "@/components/shared/forgotPassword"



export default function Registration(){
    const [signUp,setSignup]=useState(false)
    const [login,setLogin]=useState(true)
    const [isForgot,setIsForgot]=useState(false)

    const Handsignup=()=>{
       setLogin(true)
       setSignup(false)
       setIsForgot(false)
    }
    const Handlelogin=()=>{
        setLogin(false)
        setSignup(true)
        setIsForgot(false)
     }
     const HandleForgot=()=>{
      setLogin(false)
      setSignup(false)
      setIsForgot(true)
   }
   const LinkForgot = ()=>{
    setLogin(false)
    setSignup(false)
    setIsForgot(true)
   }
    return (
      <div className="bg-[#dddd]">
        <div className="flex justify-center items-center gap-[20px] flex-col h-[100vh]">
            {signUp && (<SignUp pass={Handsignup}/>)}
            {login && (<Login pass={Handlelogin} forgot={LinkForgot}/>)}
            {isForgot && (<ForgotPassword pass={HandleForgot}/>)}
        </div>
      </div>
    )
}