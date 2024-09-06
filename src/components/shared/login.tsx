import { LoginOutlined, MailOutlined, LockOutlined, CheckOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, Button, Card, Typography, notification } from "antd";
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
    const [formData, setFormData] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const { status, error } = useAppSelector((state) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const result = await dispatch(loginUser(formData));

        if (loginUser.rejected.match(result)) {
            notification.error({
                message: 'Login failed',
                description: result.payload as string || 'Invalid credentials, please try again.',
            });
        } else if (loginUser.fulfilled.match(result)) {
            notification.success({
                message: 'Login successful!',
            });
            router.push('/dashboardPage');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <Card className="w-full md:w-3/4 lg:w-2/4 mx-auto my-5">
                <div className="flex flex-col md:flex-row justify-center rounded-[20px]">
                    <div className="w-full md:w-[50%] px-[20px] bg-[#eeee] flex flex-col gap-4 justify-between rounded-tl-[8px] rounded-bl-[8px] py-[35px]">
                        <div className="border-2 border-black p-[5px] rounded-[8px] font-bold w-[35px] text-[#A0D911] text-center flex justify-center items-center">
                            <CheckOutlined className="font-bold text-[#c0d310]" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg md:text-xl">DoRoll</h1>
                            <Text>By Awesomity Lab</Text>
                        </div>
                        <span className="text-[10px]">&copy;2024 Awesomity Lab</span>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full md:w-[50%] bg-white px-[20px] py-[35px] rounded-tr-[10px] rounded-br-[10px]">
                        <h1 className="pb-[20px] font-bold text-lg md:text-xl">Login</h1>
                        <div className="w-full mb-4">
                            <label htmlFor="email" className="block mb-1">
                                <Text>Email</Text>
                                <Input
                                    type="text"
                                    placeholder="Enter email"
                                    prefix={<MailOutlined className="text-[#c0d310]" />}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                            </label>
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor="password" className="block mb-1">
                                <Text>Password</Text>
                                <Input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    prefix={<LockOutlined className="text-[#c0d310]" />}
                                    suffix={
                                        passwordVisible ? 
                                        <EyeInvisibleOutlined className="text-[10px] text-[#c0d310]" onClick={togglePasswordVisibility} /> : 
                                        <EyeOutlined className="text-[10px] text-[#c0d310]" onClick={togglePasswordVisibility} />
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                            </label>
                        </div>
                        <div className="flex justify-between items-center pt-[20px]">
                            <Text className="underline cursor-pointer" onClick={props.forgot}>Forgot Password</Text>
                            <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
            <Card className="w-full md:w-3/4 lg:w-2/4 mx-auto mt-5">
                <div className="flex justify-between items-center p-5 md:flex-row">
                    <div className="flex flex-col">
                        <Text>If you don't have an account?</Text>
                        <Text>Go to register</Text>
                    </div>
                    <Button onClick={props.pass} icon={<LoginOutlined className="text-[#c0d310]" />} iconPosition="start">
                        Register
                    </Button>
                </div>
            </Card>
        </>
    );
}
