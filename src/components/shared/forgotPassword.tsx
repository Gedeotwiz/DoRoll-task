
import {Input ,Button,Card}from "antd"
import React,{useState} from "react";
import {LoginOutlined,MailOutlined} from "@ant-design/icons"
import {Typography } from 'antd';

const { Text, Link } = Typography;


export default function ForgotPassword(props:any){
    const [position, setPosition] = useState<'start' | 'end'>('end');
     return (
        <Card className="w-1/4">
             <form action="" className="p-4">
                <h1 className="pb-3 text-lg">Forgot Password</h1>
             <div className="w-full">
                    <label htmlFor="" className="text-[10px]"><Text>Email</Text>
                        <Input type="text" variant="filled" placeholder="Enter email" prefix={<MailOutlined className="text-[#c0d310]"/>}/>
                        
                    </label>
                </div>
                <div className="flex justify-between items-center pt-[20px]">
                  <Link href="/" className="underline text-xs" onClick={props.pass}>Login instead</Link>
                  <Button type="primary" icon={<LoginOutlined />} iconPosition={position}>
                   <Link href="/index"> Login</Link>
                  </Button>
                 </div>
             </form>
        </Card>
     )
}