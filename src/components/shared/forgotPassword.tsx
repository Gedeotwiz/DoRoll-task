
import {Input ,Button,Card, notification}from "antd"
import React,{useState} from "react";
import {CheckOutlined,MailOutlined} from "@ant-design/icons"
import {Typography } from 'antd';
import {useForgotPasswordMutation} from "../redux/task/api/apiSlice"

const { Text, Link } = Typography;


export default function ForgotPassword(props:any){

    const [email,setEmail]= useState<string>("")


    const [forgot]=useForgotPasswordMutation()

    const HandForgot=async()=>{
        try {
            const result = await forgot({email}).unwrap();
            notification.success({
              message: "successfully email sent",
           });
          setEmail("")
        } catch (error) {
            console.log(error)
            notification.error({
                message: "Fail to send email verfication",
             });
        }
    }
    const [position, setPosition] = useState<'start' | 'end'>('end');
     return (
        <Card className="w-1/4">
             <form action="" className="p-4">
                <h1 className="pb-3 text-lg">Forgot Password</h1>
             <div className="w-full">
                    <label htmlFor="" className="text-[10px]"><Text>Email</Text>
                        <Input type="text" variant="filled" placeholder="Enter email"  value={email}
                          onChange={(e) => setEmail(e.target.value)} prefix={<MailOutlined className="text-[#c0d310]"/>}/>
                        
                    </label>
                </div>
                <div className="flex justify-between items-center pt-[20px]">
                  <Link href="/" className="underline text-xs" onClick={props.pass}>Login instead</Link>
                  <Button type="primary" icon={<CheckOutlined />} onClick={HandForgot} iconPosition={position}>
                    Submit
                  </Button>
                 </div>
             </form>
        </Card>
     )
}