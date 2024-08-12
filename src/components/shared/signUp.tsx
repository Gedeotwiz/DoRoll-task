import React,{useState} from "react";

import Link from "next/link"
import {LoginOutlined,UserOutlined,PhoneOutlined,MailOutlined,LockOutlined} from "@ant-design/icons";
import { Checkbox,Input,Button } from 'antd';
import type { GetProp } from 'antd';

export default function SignUp(props:any){
    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        console.log('checked = ', checkedValues);

      };
      const plainOptions = ['I agree to the'];

const options = [
  { label: 'I agree to the', value: 'I agree to the' },

];

const optionsWithDisabled = [
  { label: 'I agree to the', value: 'I agree to the' },
  
];
const [position, setPosition] = useState<'start' | 'end'>('end');

    return (
        <>
         <form action="" className="bg-white w-[40%] p-[20px] rounded-[10px]">
             <h1 className="font-bold pb-[10px]">Register</h1>
              <div className=" flex justify-between items-center">
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">First Name
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" prefix={<UserOutlined className="text-[12px] text-[#A0D911]" />} placeholder="Enter first name"/>
                    </label>
                 </div>
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Last Name
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter last name" prefix={<UserOutlined className="text-[12px] text-[#A0D911]"/>}/>
                    </label>
                 </div>
              </div>
              <div className=" flex justify-between items-center">
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Email
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter email" prefix={<MailOutlined className="text-[12px] text-[#A0D911]"/>}/>
                        
                    </label>
                 </div>
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Phone Number
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="250 --- --- ---" prefix={<PhoneOutlined className="text-[12px] text-[#A0D911]"/>}/>
                        
                    </label>
                 </div>
              </div>
              <div className=" flex justify-between items-center">
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Password
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter password" prefix={<LockOutlined className="text-[12px] text-[#A0D911]"/>}/>
                    </label>
                 </div>
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Comfrim Password
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter confrim password" prefix={<LockOutlined className="text-[12px] text-[#A0D911]"/>}/>
                        
                    </label>
                 </div>
              </div>
               <div className="flex justify-between items-center pt-[20px]">
                 <div className="flex justify-center items-center gap-[10px]">
                  <Checkbox.Group options={plainOptions} defaultValue={['I agree to the']} onChange={onChange} />
                    <span className="underline font-bold">Terms and Conditions</span>
                 </div>
                 <Button type="primary" icon={<LoginOutlined />} iconPosition={position}>
                   Register
                  </Button>
               </div>
         </form>
         <div className="bg-white w-[40%] p-[20px] rounded-[10px] flex justify-between items-center">
            <div>
                <p>Already have an account?</p>
                <span>Go to Login</span>
            </div>
            <li className="flex gap-[10px] justify-start items-center border border-gray-300 py-[6px] px-[16px] rounded-[5px]" onClick={props.pass}><p>Login</p><LoginOutlined className="text-[#A0D911]"/></li>
         </div>
        </>
    )
}