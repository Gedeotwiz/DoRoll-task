import { LoginOutlined, MailOutlined, LockOutlined, CheckOutlined, EyeOutlined } from "@ant-design/icons";
import { Input, Button, Card, Typography } from "antd";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { jwtDecode } from "jwt-decode";

const { Text, Link } = Typography;

export default function Login(props: any) {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/API/V1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                const token = result.token;
                localStorage.setItem('token', token);

                const decodedToken: any = jwtDecode(token);
                const userRole = decodedToken.role;
                alert(result.message);
                if (userRole === 'admin') {
                    router.push('/dashboardPage');
                } else if (userRole === 'user') {
                    router.push('/dashboardPage');
                } else {
                    alert('Role not recognized');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed');
        }
    };

    return (
        <>
            <Card className="w-2/4">
                <div className="flex justify-center rounded-[20px]">
                    <div className="w-[50%] px-[20px] bg-[#eeee] flex flex-col justify-between rounded-tl-[8px] rounded-bl-[8px] py-[35px]">
                        <div className="border-2 border-black p-[5px] rounded-[8px] font-bold w-[35px] text-[#A0D911] text-center flex justify-center items-center">
                            <CheckOutlined className="font-bold text-[#c0d310]" />
                        </div>
                        <div>
                            <h1 className="font-bold">DoRoll</h1>
                            <Text>By Awesomity Lab</Text>
                        </div>
                        <span className="text-[10px]">&copy;2024 Awesomity Lab</span>
                    </div>
                    <form onSubmit={handleSubmit} className="w-[50%] bg-white px-[20px] py-[35px] rounded-tr-[10px] rounded-br-[10px]">
                        <h1 className="pb-[20px] font-bold">Login</h1>
                        <div className="w-full">
                            <label htmlFor="email"><Text>Email</Text>
                                <Input type="text" variant="filled" placeholder="Enter email" prefix={<MailOutlined className="text-[#c0d310]" />}
                                    name="email" value={formData.email} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password"><Text>Password</Text>
                                <Input type="password" variant="filled" placeholder="Enter password" prefix={<LockOutlined className="text-[#c0d310]" />}
                                    suffix={<EyeOutlined className="text-[10px] text-[#c0d310]" />}
                                    name="password" value={formData.password} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="flex justify-between items-center pt-[20px]">
                            <Text className="underline " onClick={props.forgot}>Forgot Password</Text>
                            <Button type="primary" htmlType="submit" icon={<LoginOutlined />} iconPosition={position}>
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
            <Card className="w-2/4 ">
                <div className="flex justify-between items-center p-5">
                    <div className="flex flex-col">
                        <Text>If you don't have an account?</Text>
                        <Text>Go to register</Text>
                    </div>
                    <Button onClick={props.pass} icon={<LoginOutlined className="text-[#c0d310]" />} iconPosition={position}>Register</Button>
                </div>
            </Card>
        </>
    );
}
