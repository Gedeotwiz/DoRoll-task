import { LoginOutlined, MailOutlined, LockOutlined, CheckOutlined, EyeOutlined } from "@ant-design/icons";
import { Input, Button, Card, Typography } from "antd";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { loginUser } from '../redux/auth/thunk';

const { Text } = Typography;

interface LoginProps {
    forgot: () => void;
    pass: () => void;
}

export default function Login(props: LoginProps) {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [formData, setFormData] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const { status, error, user } = useAppSelector((state) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                
                const userRole = user?.role; 
                if (userRole === 'admin') {
                    router.push('/dashboardPage');
                } else {
                    router.push('/dashboardPage');
                }
            }
        });
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
                            <label htmlFor="email">
                                <Text>Email</Text>
                                <Input
                                    type="text"
                                    placeholder="Enter email"
                                    prefix={<MailOutlined className="text-[#c0d310]" />}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password">
                                <Text>Password</Text>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    prefix={<LockOutlined className="text-[#c0d310]" />}
                                    suffix={<EyeOutlined className="text-[10px] text-[#c0d310]" />}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="flex justify-between items-center pt-[20px]">
                            <Text className="underline " onClick={props.forgot}>Forgot Password</Text>
                            <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
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
