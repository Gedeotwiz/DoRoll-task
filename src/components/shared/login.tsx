import Link from "next/link"
import {LoginOutlined,MailOutlined,LockOutlined,CheckOutlined,EyeOutlined} from "@ant-design/icons"
import {Input ,Button}from "antd"
import React,{useState} from "react";


export default function Login(props:any){
    const [position, setPosition] = useState<'start' | 'end'>('end');
    return (
        <>
        <div className="w-[40%] flex justify-center rounded-[20px]">
            <div className="w-[50%] px-[20px] bg-[#eeee] flex flex-col justify-between rounded-tl-[10px] rounded-bl-[10px] py-[35px]">
                <div className="border-2 border-black p-[5px] rounded-[8px] font-blod w-[35px] text-[#A0D911] text-center flex justify-center items-center">
                 <CheckOutlined className=" font-blod  text-[#c0d310]"/>
                </div>
             
              <div>
                 <h1 className="font-bold">DoRoll</h1>
                 <p className="text-[10px]">By Awesomity Lab</p>
              </div>
              <span className="text-[10px]">&copy;2024 Awesomity Lab</span>
            </div>
            <form action="" className="w-[50%] bg-white px-[20px] py-[35px] rounded-tr-[10px] rounded-br-[10px]">
                <h1 className="pb-[20px] font-bold">Login</h1>
                <div className="w-full">
                    <label htmlFor="" className="text-[10px]">Email
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter email" prefix={<MailOutlined className="text-[12px] text-[#c0d310]"/>}/>
                        
                    </label>
                </div>
                <div className="w-full">
                    <label htmlFor="" className="text-[10px]">Password
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter password" prefix={<LockOutlined className="text-[12px] text-[#c0d310]"/>}

                         suffix={<EyeOutlined className="text-[12px] text-[#c0d310]"/>}
                        />
                    </label>
                 </div>
                 <div className="flex justify-between items-center pt-[20px]">
                  <Link href="/" className="underline">Forgot Password</Link>
                  <Button type="primary" icon={<LoginOutlined />} iconPosition={position}>
                   Login
                  </Button>
                 </div>
            </form>
        </div>
         <div className="bg-white w-[40%] p-[20px] rounded-[10px] flex justify-between items-center">
            <div>
                <p>If you don't have an account?</p>
                <span>Go to register</span>
            </div>
            <li className="flex gap-[10px] justify-start items-center border border-gray-300 py-[6px] px-[16px] rounded-[5px]" onClick={props.pass}><p>Register</p><LoginOutlined className="text-[#c0d310]"/></li>
         </div>
        </>
    )
}