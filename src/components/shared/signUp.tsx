import React, { useState } from "react";
import { Checkbox, Input, Button } from 'antd';
import { LoginOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import {Typography } from 'antd';

const { Text, Link } = Typography;

export default function SignUp(props: any) {
    const onChange = (checkedValues: any) => {
        console.log('checked = ', checkedValues);
    };

    const plainOptions = [
      {
          label: <span style={{ fontSize: '10px', fontFamily: 'Arial, sans-serif' }}>I agree to the</span>,
          value: 'I agree to the'
      }
  ];
    
    const [position, setPosition] = useState<'start' | 'end'>('end');

    return (
        <>
            <form action="" className="bg-white w-[40%] p-[20px] rounded-[10px]">
                <h1 className="font-bold pb-[10px]">Register</h1>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor="" ><Text>First Name</Text>
                            <Input type="text" variant="filled" prefix={<UserOutlined className="text-[#c0d310]" />} placeholder="Enter first name" />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="" ><Text>Last Name</Text>
                            <Input type="text" variant="filled" placeholder="Enter last name" prefix={<UserOutlined className="text-[#c0d310]" />} />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor="" ><Text>Email</Text>
                            <Input type="text" variant="filled" placeholder="Enter email" prefix={<MailOutlined className="text-[#c0d310]" />} />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="" ><Text>Phone Number</Text>
                            <Input type="text" variant="filled" placeholder="250 --- --- ---" prefix={<PhoneOutlined className="text-[#c0d310]" />} />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor=""><Text>Password</Text>
                            <Input type="password" variant="filled" placeholder="Enter password" prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={<EyeOutlined className="text-[10px] text-[#c0d310]" />} />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="" ><Text>Confirm Password</Text>
                            <Input type="password" variant="filled" placeholder="Enter confirm password" prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={<EyeOutlined className="text-[12px] text-[#c0d310]" />} />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-[20px]">
                    <div className="flex justify-center items-center">
                        <Checkbox.Group options={plainOptions} defaultValue={[]} onChange={onChange} />
                        <Text className="underline font-medium text-xs">Terms and Conditions</Text>
                    </div>
                    <Button type="primary" icon={<LoginOutlined />} iconPosition={position}>
                        Register
                    </Button>
                </div>
            </form>
            <div className="bg-white w-[40%] p-[20px] rounded-[10px] flex justify-between items-center">
                <div className="flex flex-col">
                    <Text>Already have an account?</Text>
                    <Text>Go to Login</Text>
                </div>
                <Button onClick={props.pass} icon={<LoginOutlined className="text-[#c0d310]" />} iconPosition={position}>Login</Button>
            </div>
        </>
    );
}
