import React, { useState } from "react";
import { Checkbox, Input, Button, Typography, notification } from 'antd';
import { LoginOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/auth/registerSlice';
import { Router } from "next/router";

type Props = {
    signupCallback: () => void
}

const { Text } = Typography;

export default function SignUp({ signupCallback }: Props) {
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: "user"
    });
    const [errors, setErrors] = useState<any>({});
    const [showErrors, setShowErrors] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [login,setLogin]=useState(false)
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            setShowErrors(true);
            return;
        }

            const response = await dispatch(registerUser(formData) as any);
            if(response?.payload?.error){
                notification.error({
                    message: response?.payload?.message[0]
                })
            }else{
                notification.success({
                            message: 'Registration successful, Please Login with your new account'
                        })
                        signupCallback()
            }
    };

    const validate = () => {
        const newErrors: any = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
        if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords must match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => { 
        setIsChecked(e.target.checked);
        setShowErrors(true); 
        validate(); 
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white  p-[20px] rounded-[10px] 2xl:w-[40%] xl:w-[55%] lg:w-[60%] md:w-[75%] sm:w-[85%] xs:w-[90%]">
                <h1 className="font-bold pb-[10px]">Register</h1>
                <div className="flex justify-between items-center md:flex-row">
                    <div className="w-[47%]">
                        <label htmlFor="firstName">
                            <Text>First Name</Text>
                            <Input type="text" prefix={<UserOutlined className="text-[#c0d310]" />} placeholder="Enter first name"
                                name="firstName" value={formData.firstName} onChange={handleChange} />
                            {showErrors && errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="lastName">
                            <Text>Last Name</Text>
                            <Input type="text" placeholder="Enter last name" prefix={<UserOutlined className="text-[#c0d310]" />}
                                name="lastName" value={formData.lastName} onChange={handleChange} />
                            {showErrors && errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center md:flex-row">
                    <div className="w-[47%]">
                        <label htmlFor="email">
                            <Text>Email</Text>
                            <Input type="email" placeholder="Enter email" prefix={<MailOutlined className="text-[#c0d310]" />}
                                name="email" value={formData.email} onChange={handleChange} />
                            {showErrors && errors.email && <span className="text-red-500">{errors.email}</span>}
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="phoneNumber">
                            <Text>Phone Number</Text>
                            <Input type="text" placeholder="250 --- --- ---" prefix={<PhoneOutlined className="text-[#c0d310]" />}
                                name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                            {showErrors && errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center md:flex-">
                    <div className="w-[47%]">
                        <label htmlFor="password">
                            <Text>Password</Text>
                            <Input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter password"
                                prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={
                                    passwordVisible ?
                                        <EyeInvisibleOutlined className="text-[10px] text-[#c0d310]" onClick={togglePasswordVisibility} /> :
                                        <EyeOutlined className="text-[10px] text-[#c0d310]" onClick={togglePasswordVisibility} />
                                }
                                name="password" value={formData.password} onChange={handleChange} />
                            {showErrors && errors.password && <span className="text-red-500">{errors.password}</span>}
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label htmlFor="confirmPassword">
                            <Text>Confirm Password</Text>
                            <Input
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Enter confirm password"
                                prefix={<LockOutlined className="text-[#c0d310]" />}
                                suffix={
                                    confirmPasswordVisible ?
                                        <EyeInvisibleOutlined className="text-[10px] text-[#c0d310]" onClick={toggleConfirmPasswordVisibility} /> :
                                        <EyeOutlined className="text-[10px] text-[#c0d310]" onClick={toggleConfirmPasswordVisibility} />
                                }
                                name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                            {showErrors && errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-[20px]">
                    <div className="flex justify-center items-center">
                        <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
                            I agree to the <Text className="underline font-medium text-xs">Terms and Conditions</Text>
                        </Checkbox>
                    </div>
                    <Button type="primary" htmlType="submit" icon={<LoginOutlined />} iconPosition={position} disabled={!isChecked}>
                        Register
                    </Button>
                </div>
            </form>
            <div className="bg-white  p-[20px] rounded-[10px] flex justify-between items-center 2xl:w-[40%] xl:w-[55%] lg:w-[60%] md:w-[75%] sm:w-[85%] xs:w-[90%]">
                <div className="flex flex-col">
                    <Text>Already have an account?</Text>
                    <Text>Go to Login</Text>
                </div>
                <Button onClick={signupCallback} icon={<LoginOutlined className="text-[#c0d310]" />} iconPosition={position}>Login</Button>
            </div>
        </>
    );
}
