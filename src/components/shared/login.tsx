import Link from "next/link"
import {LoginOutlined} from "@ant-design/icons"


export default function Login(props:any){
    return (
        <>
         <div className="bg-white w-[40%] p-[20px] rounded-[10px] flex justify-between items-center">
            <div>
                <p>If you don't have an account?</p>
                <span>Go to register</span>
            </div>
            <li className="flex gap-[10px] justify-start items-center border border-gray-300 py-[6px] px-[16px] rounded-[5px]" onClick={props.pass}><p>Register</p><LoginOutlined className="text-[#A0D911]"/></li>
         </div>
        </>
    )
}