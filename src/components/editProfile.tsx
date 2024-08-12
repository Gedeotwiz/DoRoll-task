import React,{useState} from "react";
import Image from "next/image";
import jant from "../images/jantie.jpeg";
import { Checkbox,Input,Button } from 'antd';
import {CheckOutlined,UserOutlined,PhoneOutlined,MailOutlined,LockOutlined,EyeOutlined} from "@ant-design/icons";

export default function EditProfile() {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    return (
        <div className="w-[40%] bg-white p-[20px] rounded-[10px]">
            <div className="bg-[#dddd] rounded-[10px] flex flex-col justify-center items-center px-[20px] py-[30px] gap-[10px]">
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden"> 
                   <Image src={jant} alt="Profile picture" className="w-full h-full object-cover"/>
                </div>
                <h1 className="font-bold">Yves Honore B.</h1>
                <p className="text-gray-500">yveshonore@awesomity.rw</p>
            </div>

            <form action="" className="py-[20px]">
                <h1>Edit My Profile Info</h1>
                <div className=" flex justify-between items-center">
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">First Name
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" prefix={<UserOutlined className="text-[12px] text-[#c0d310]" />} placeholder="Enter first name"/>
                    </label>
                 </div>
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Last Name
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter last name" prefix={<UserOutlined className="text-[12px] text-[#c0d310]"/>}/>
                    </label>
                 </div>
              </div>
              <div className=" flex justify-between items-center">
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Email
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter email" prefix={<MailOutlined className="text-[12px] text-[#c0d310]"/>}/>
                        
                    </label>
                 </div>
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Phone Number
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="250 --- --- ---" prefix={<PhoneOutlined className="text-[12px] text-[#c0d310]"/>}/>
                        
                    </label>
                 </div>
              </div>
              <div className="flex justify-end pt-[18px]">
                <Button type="primary" icon={<CheckOutlined />} iconPosition={position}>
                   Save Changes
                </Button>
              </div>
            </form>

            <form action="">
                <h1>Edit My Password</h1>
                <div className=" flex justify-between items-center">
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">Current Password
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter password" prefix={<LockOutlined className="text-[12px] text-[#c0d310]"/>}
                         suffix={<EyeOutlined className="text-[12px] text-[#c0d310]"/>}
                        />

                    </label>
                 </div>
                 <div className="w-[47%]">
                    <label htmlFor="" className="text-[10px]">New Password
                        <Input type="text" className="bg-[#dddd] w-full rounded-[5px] p-[4px] text-[12px]" placeholder="Enter confrim password" prefix={<LockOutlined className="text-[12px] text-[#c0d310]"/>}
                         suffix={<EyeOutlined className="text-[12px] text-[#c0d310]"/>}
                        />
                        
                    </label>
                 </div>
              </div>
              <div className="flex justify-end pt-[18px]">
                <Button type="primary" icon={<CheckOutlined />} iconPosition={position}>
                   Save Password
                </Button>
              </div>
            </form>
        </div>
    );
}
