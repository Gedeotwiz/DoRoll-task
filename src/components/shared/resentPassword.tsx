
import {Input ,Button,Card}from "antd"
import React,{useState} from "react";
import {CheckOutlined,LockOutlined} from "@ant-design/icons"
import {Typography } from 'antd';

const { Text, Link } = Typography;


export default function ResentPassword(props:any){
    const [position, setPosition] = useState<'start' | 'end'>('end');
     return (
        <Card className="w-1/4">
             <form action="" className="p-4">
                <h1 className="pb-3 text-lg">Resent Password</h1>
                <div className="w-full">
                    <label htmlFor="" className="text-[10px]"><Text>New Password</Text>
                        <Input type="password" variant="filled" placeholder="New Password" prefix={<LockOutlined className="text-[#c0d310]" />}/>
                        
                    </label>
                </div>
                <div className="w-full">
                    <label htmlFor="" className="text-[10px]"><Text>Confrim Password</Text>
                        <Input type="password" variant="filled" placeholder="Confrim Password" prefix={<LockOutlined className="text-[#c0d310]" />}/>
                        
                    </label>
                </div>
                <div className="flex justify-between items-center pt-[20px]">
                  <Link href="/" className="underline text-xs" onClick={props.pass}>Login instead</Link>
                  <Button type="primary" icon={<CheckOutlined />} iconPosition={position}>
                   <Link href="/"> Submit</Link>
                  </Button>
                 </div>
             </form>
        </Card>
     )
}