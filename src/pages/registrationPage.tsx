
import Header from "@/components/shared/layout/header"
import Footer from "@/components/shared/layout/footer"
import SignUp from "@/components/shared/signUp"
import Login from "@/components/shared/login"
import React,{useState} from "react"



export default function Registration(){
    const [signUp,setSignup]=useState(false)
    const [login,setLogin]=useState(true)

    const Handsignup=()=>{
       setLogin(true)
       setSignup(false)
    }
    const Handlelogin=()=>{
        setLogin(false)
        setSignup(true)
     }
    return (
      <div className="bg-[#dddd]">
        <Header/>
        <div className="flex justify-center items-center gap-[20px] flex-col h-[85vh]">
            {signUp && (<SignUp pass={Handsignup}/>)}
            {login && (<Login pass={Handlelogin}/>)}
        </div>
        <Footer/>
      </div>
    )
}