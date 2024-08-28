import React, { useEffect, useState } from "react";
import Image from "next/image";
import jant from "../images/jantie.jpeg";
import { Input, Button, message } from 'antd';
import { CheckOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import { useUpdateProfileMutation } from '../components/redux/task/api/apiSlice'; 
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: string;
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }

export default function EditProfile() {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [updateProfile] = useUpdateProfileMutation();
    const [userId, setUserId] = useState<string>('');
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            setUserId(decoded.userId);
        }
    }, []);

    useEffect(() => {
        if (userId){
            const fetchUserData = async () => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`http://localhost:3001/API/V1/users/${userId}`, {
                        
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        }
                    });
                    console.log(response)
                  if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                  }
                  const data = await response.json();
                  
                  setUserData({
                    firstName: data.firstName||'',
                    lastName: data.lastName ||'',
                    email: data.email || '',
                    phoneNumber: data.phoneNumber || '',
                });
                } catch (error) {
                  message.error('Error fetching user data');
                }
              };
              fetchUserData();
        }
      }, [userId]);
      console.log(userData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSaveChanges = async () => {
        if (!userId) {
            message.error("User ID is not available");
            return;
        }

        try {
            const response = await updateProfile({ id: userId, ...userData }).unwrap();
            message.success(response.message);
        } catch (error) {
            message.error("Failed to update profile");
        }
    };

    return (
        <div className="w-[30%] bg-white p-[20px] rounded-[10px]">
            <div className="bg-[#dddd] rounded-[10px] flex flex-col justify-center items-center px-[20px] py-[30px] gap-[10px]">
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden"> 
                   <Image src={jant} alt="Profile picture" className="w-full h-full object-cover"/>
                </div>
                <h1 className="font-bold">{userData.firstName} {userData.lastName}</h1>
                <p className="text-gray-500">{userData.email}</p>
            </div>

            <form className="py-[20px]">
                <h1 className="text-xs">Edit My Profile Info</h1>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label className="text-[10px]">First Name
                            <Input
                                type="text"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleInputChange}
                                prefix={<UserOutlined className="text-[12px] text-[#c0d310]" />}
                                placeholder="Enter first name"
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label className="text-[10px]">Last Name
                            <Input
                                type="text"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputChange}
                                prefix={<UserOutlined className="text-[12px] text-[#c0d310]"/>}
                                placeholder="Enter last name"
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label className="text-[10px]">Email
                            <Input
                                type="text"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                prefix={<MailOutlined className="text-[12px] text-[#c0d310]"/>}
                                placeholder="Enter email"
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label className="text-[10px]">Phone Number
                            <Input
                                type="text"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={handleInputChange}
                                prefix={<PhoneOutlined className="text-[12px] text-[#c0d310]"/>}
                                placeholder="250 --- --- ---"
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-end pt-[18px]">
                    <Button type="primary" icon={<CheckOutlined />} iconPosition={position} onClick={handleSaveChanges}>
                       Save Changes
                    </Button>
                </div>
            </form>

            <form>
                <h1>Edit My Password</h1>
                <div className="flex justify-between items-center">
                    <div className="w-[47%]">
                        <label className="text-[10px]">Current Password
                            <Input
                                type="password"
                                placeholder="Enter password"
                                prefix={<LockOutlined className="text-[12px] text-[#c0d310]"/>}
                                suffix={<EyeOutlined className="text-[12px] text-[#c0d310]"/>}
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label className="text-[10px]">New Password
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                prefix={<LockOutlined className=" text-[#c0d310]"/>}
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
