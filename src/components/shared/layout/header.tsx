import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; 
import { SettingOutlined, HomeOutlined, CheckOutlined, UpOutlined, UserOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined, FolderOutlined, LogoutOutlined } from "@ant-design/icons";
import ButtonComponent from "../button";
import { Button, Modal, Input } from 'antd';
import jant from "../../../images/jantie.jpeg";
import Image from "next/image";
import head from "../../../images/headphono.png";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import {jwtDecode} from "jwt-decode";
import { useAppDispatch } from '../../redux/store/hooks';
import { AddNewtask } from '../../redux/slices/newtaskSlice'; 

const { TextArea } = Input;

export default function Header() {
  const router = useRouter(); 
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null); 

  const handleLogout =()=>{
    localStorage.removeItem("token")
    router.push("/")
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token); 
      setUserId(decoded.userId); 
    }
  }, []); 

  const onDateChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
    if (Array.isArray(dateString)) {
      setTime(dateString[0] || '');
    } else {
      setTime(dateString);
    }
  };

  const handleSubmit = async () => { 
    if (!title || !description || !time || !userId) {  
      alert('All fields are required!');  
      return;  
    }  

    setLoading(true);  
    try {  
      await dispatch(AddNewtask({ title, description, time, userId })).unwrap();
      alert('Task added successfully');  
      setOpen(false);  
      setTitle('');   
      setDescription('');  
      setTime('');
    } catch (error) {  
      console.log('Error adding task:', error);  
      alert('Failed to add task');  
    } finally {  
      setLoading(false);  
    }  
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handProf = () => {
    setIsProfile(prevState => !prevState);
  };

  const isHome = router.pathname === "/";
  const isSettings = router.pathname === "/settingpage";

  return (
    <>
      <main className="bg-white py-[10px] px-[50px] flex justify-between items-center">
        <div className="flex justify-center items-center gap-[10px]">
          <CheckOutlined className="border-4 border-black p-[5px] rounded-[8px] text-bold"/>
          <h1>DoRoll</h1>
        </div>
        <div className="flex justify-center items-center gap-[30px]">
          <div className="flex justify-center items-center gap-[10px]">
            <HomeOutlined className={isHome ? "text-[#c0d310]" : ""}/>
            <Link href="/dashboardPage" className={isHome ? "font-bold " : ""}>Home</Link>
          </div>
          <div className="flex justify-center items-center gap-[10px]">
            <SettingOutlined className={isSettings ? "text-[#c0d310]" : ""}/>
            <Link href="/settingpage" className={isSettings ? "font-bold " : ""}>Settings</Link>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[20px]">
          <ButtonComponent name="New task +" type="primary" pass={showLoading}/>
          <div className="flex justify-center items-center" onClick={handProf}>
            <UserOutlined className="border border-r-gray-200 p-[10px] rounded-tl-[5px] rounded-bl-[5px]"/>
            <UpOutlined className="text-[10px] border py-[13px] px-[5px] rounded-tr-[5px] rounded-br-[5px]"/>
          </div>
          {isProfile && (
            <div className="bg-white rounded-[5px] absolute top-[56px] right-[3.5%] px-[20px] py-[30px] shadow">
              <div className="flex gap-[10px] justify-center items-center">
                <Image src={jant} alt="good" className="w-[50px] h-[50px] rounded-[10px] object-cover"/>
                <div>
                  <h3>Yves Honore B.</h3>
                  <p className="text-gray-400 text-[12px]">yveshonore@awesomity.rw</p>
                </div>
              </div>
              <div className="flex flex-col gap-[14px] py-[20px] my-[20px] border-y border-y-gray-200 list-none">
                <li className="flex gap-[10px] justify-start items-center">
                  <UserOutlined/>
                  <Link href="/">My Profile</Link>
                </li>
                <li className="flex gap-[10px] justify-start items-center">
                  <Image src={head} alt="head" className="w-[15px] h-[15px]"/>
                  <Link href="/">Help</Link>
                </li>
                <li className="flex gap-[10px] justify-start items-center">
                  <ExclamationCircleOutlined/>
                  <Link href="/">About</Link>
                </li>
                <li className="flex gap-[10px] justify-start items-center">
                  <FolderOutlined/>
                  <Link href="/">Archives</Link>
                </li>
              </div>
              <li className="list-none flex gap-[10px] justify-start items-center" onClick={handleLogout}>
                <LogoutOutlined/>
                <Link href="#">Logout</Link>
              </li>
            </div>
          )}
        </div>
      </main>
      <Modal
        title="New Task"
        footer={
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Add task +
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        <form>
          <div className="pb-[7px]">
            <label htmlFor="title">Title
              <Input 
                type="text" 
                placeholder="Enter title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className="pb-[7px]">
            <label htmlFor="dueDate">Due Date
              <DatePicker onChange={onDateChange} format="MM/DD/YYYY" />
            </label>
          </div>
          <div className="pb-[7px]">
            <label htmlFor="description">Description
              <TextArea 
                rows={4} 
                placeholder="Enter description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
}
