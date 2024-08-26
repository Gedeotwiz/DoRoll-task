import React, { useState } from "react";
import { Checkbox, Input, Button } from 'antd';
import { LoginOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/auth/registerSlice'; 

const { Text } = Typography;

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
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(formData) as any);
            alert('Registration successful');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register');
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
                            <Input type="text" prefix={<UserOutlined className="text-[#c0d310]" />} placeholder="Enter first name"
                                name="firstName" value={formData.firstName} onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="lastName" ><Text>Last Name</Text>
                            <Input type="text" placeholder="Enter last name" prefix={<UserOutlined className="text-[#c0d310]" />}
                                name="lastName" value={formData.lastName} onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor="email" ><Text>Email</Text>
                            <Input type="email" placeholder="Enter email" prefix={<MailOutlined className="text-[#c0d310]" />}
                                name="email" value={formData.email} onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="phoneNumber" ><Text>Phone Number</Text>
                            <Input type="text" placeholder="250 --- --- ---" prefix={<PhoneOutlined className="text-[#c0d310]" />}
                                name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label htmlFor="password"><Text>Password</Text>
                            <Input type="password" placeholder="Enter password" prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={<EyeOutlined className="text-[10px] text-[#c0d310]" />}
                                name="password" value={formData.password} onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="confirmPassword" ><Text>Confirm Password</Text>
                            <Input type="password" placeholder="Enter confirm password" prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={<EyeOutlined className="text-[12px] text-[#c0d310]" />}
                                name="confirmPassword" value={formData.password} onChange={handleChange}
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
