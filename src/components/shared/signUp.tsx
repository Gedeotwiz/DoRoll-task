import React, { useState } from "react";
import { Checkbox, Input, Button } from 'antd';
import { LoginOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography } from 'antd';

const { Text, Link } = Typography;

export default function SignUp(props: any) {
    const [isChecked, setIsChecked] = useState(false); 

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: "user"
    });
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const handleChange = async (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/API/V1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log(result);
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCheckboxChange = (checkedValues: any) => {
        setIsChecked(checkedValues.length > 0); 
    };

    const plainOptions = [
        {
            label: <span style={{ fontSize: '10px', fontFamily: 'Arial, sans-serif' }}>I agree to the</span>,
            value: 'I agree to the'
        }
    ];

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white w-[40%] p-[20px] rounded-[10px]">
                <h1 className="font-bold pb-[10px]">Register</h1>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor="firstName" ><Text>First Name</Text>
                            <Input type="text" variant="filled" prefix={<UserOutlined className="text-[#c0d310]" />} placeholder="Enter first name"
                                name="firstName" value={formData.firstName} onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="lastName" ><Text>Last Name</Text>
                            <Input type="text" variant="filled" placeholder="Enter last name" prefix={<UserOutlined className="text-[#c0d310]" />}
                                name="lastName" value={formData.lastName} onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor="email" ><Text>Email</Text>
                            <Input type="email" variant="filled" placeholder="Enter email" prefix={<MailOutlined className="text-[#c0d310]" />}
                                name="email" value={formData.email} onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="phoneNumber" ><Text>Phone Number</Text>
                            <Input type="string" variant="filled" placeholder="250 --- --- ---" prefix={<PhoneOutlined className="text-[#c0d310]" />}
                                name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor="password"><Text>Password</Text>
                            <Input type="password" variant="filled" placeholder="Enter password" prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={<EyeOutlined className="text-[10px] text-[#c0d310]" />}
                                name="password" value={formData.password} onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="password" ><Text>Confirm Password</Text>
                            <Input type="password" variant="filled" placeholder="Enter confirm password" prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={<EyeOutlined className="text-[12px] text-[#c0d310]" />}
                                name="password" value={formData.password} onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-[20px]">
                    <div className="flex justify-center items-center">
                        <Checkbox.Group options={plainOptions} defaultValue={[]} onChange={handleCheckboxChange} />
                        <Text className="underline font-medium text-xs">Terms and Conditions</Text>
                    </div>
                    <Button type="primary" htmlType="submit" icon={<LoginOutlined />} iconPosition={position} disabled={!isChecked}>
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
