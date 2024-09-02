import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input, Button, message, notification, Upload } from 'antd';
import { CheckOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, UploadOutlined } from "@ant-design/icons";
import { useUpdateProfileMutation, useGetUserQuery, useUpdatePasswordMutation, useUploadImageMutation } from '../components/redux/task/api/apiSlice'; 
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: string;
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
}

export default function EditProfile() {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [updateProfile] = useUpdateProfileMutation();
    const [updatePassword] = useUpdatePasswordMutation();
    const [userId, setUserId] = useState<string>('');
    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profileImage: ""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [passwordVisibility, setPasswordVisibility] = useState({
        currentPassword: false,
        newPassword: false,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            setUserId(decoded.userId);
        }
    }, []);

    const { data: fetchedUserData, error, isLoading } = useGetUserQuery(userId);

    useEffect(() => {
        if (fetchedUserData) {
            setUserData({
                firstName: fetchedUserData.data.firstName,
                lastName: fetchedUserData.data.lastName,
                email: fetchedUserData.data.email,
                phoneNumber: fetchedUserData.data.phoneNumber,
                profileImage: fetchedUserData.data.profileImage
            });
        }
    }, [fetchedUserData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const togglePasswordVisibility = (field: "currentPassword" | "newPassword") => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
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
            notification.error({
                message: 'Failed to update profile'
            })
        }
    };

    const handleChangesPassword = async () => {
        if (!userId) {
            notification.error({
                message: 'User ID is not available'
            })
        }

        try {
            if (!passwordData.currentPassword || !passwordData.newPassword) {
                notification.error({
                    message: 'Please enter both current and new passwords'
                })
            }

            const response = await updatePassword({ id: userId, ...passwordData }).unwrap();
            if (response?.payload?.error) {
                notification.error({
                    message: response.payload?.message[0]
                })
            } else {
                notification.success({
                    message: 'Password successfully updated'
                })
            }
            setPasswordData({ currentPassword: "", newPassword: "" });
        } catch (error) {
            message.error("Failed to update password");
        }
    };

    const [uploadImage] = useUploadImageMutation();

    const handleFileUpload = async (file: any) => {
        try {
            const response = await uploadImage({ id: userId, file }).unwrap();
            console.log('Upload successful', response);
            notification.success({
                message: "Profile image updated successfully"
            })
        } catch (error) {
            console.error('Upload failed', error);
            notification.error({
                message: 'Failed to upload image'
            })
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data</div>;

    const uploadProps = {
        beforeUpload: (file: File) => {
            handleFileUpload(file);
            return false; 
        },
    };

    return (
        <div className="w-[30%] bg-white p-[20px] rounded-[10px]">
            <div className="bg-[#dddd] rounded-[10px] flex flex-col justify-center items-center px-[20px] py-[30px] gap-[10px]">
                <div className="relative group"> 
                    <div className="w-[80px] h-[80px] rounded-full overflow-hidden"> 
                        <Image 
                            src={userData.profileImage} 
                            alt="Profile picture" 
                            width={100} 
                            height={100} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                   
                    <Upload {...uploadProps} className="absolute top-6 left-2 hidden group-hover:block"> 
                        <Button icon={<UploadOutlined />} className="w-16 h-6 text-[10px]">Upload</Button>
                    </Upload>
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
                                prefix={<UserOutlined className="text-[12px] text-[#c0d310]" />}
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
                                prefix={<MailOutlined className="text-[12px] text-[#c0d310]" />}
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
                                prefix={<PhoneOutlined className="text-[12px] text-[#c0d310]" />}
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
                                type={passwordVisibility.currentPassword ? "text" : "password"}
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handleInputPassword}
                                prefix={<LockOutlined className="text-[12px] text-[#c0d310]" />}
                                suffix={passwordVisibility.currentPassword ? 
                                    <EyeInvisibleOutlined onClick={() => togglePasswordVisibility("currentPassword")} /> : 
                                    <EyeOutlined onClick={() => togglePasswordVisibility("currentPassword")} />}
                                placeholder="Enter current password"
                            />
                        </label>
                    </div>
                    <div className="w-[47%]">
                        <label className="text-[10px]">New Password
                            <Input
                                type={passwordVisibility.newPassword ? "text" : "password"}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleInputPassword}
                                prefix={<LockOutlined className="text-[12px] text-[#c0d310]" />}
                                suffix={passwordVisibility.newPassword ? 
                                    <EyeInvisibleOutlined onClick={() => togglePasswordVisibility("newPassword")} /> : 
                                    <EyeOutlined onClick={() => togglePasswordVisibility("newPassword")} />}
                                placeholder="Enter new password"
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-end pt-[18px]">
                    <Button type="primary" icon={<CheckOutlined />} iconPosition={position} onClick={handleChangesPassword}>
                        Save Password
                    </Button>
                </div>
            </form>
        </div>
    );
}
