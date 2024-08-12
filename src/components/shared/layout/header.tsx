import React from "react";
import Link from "next/link";
import { SettingOutlined, HomeOutlined,CheckOutlined ,UpOutlined,UserOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined,FolderOutlined,LogoutOutlined } from "@ant-design/icons";
import ButtonComponent from "../button";
import { Button, Modal } from 'antd';
import jant from "../../../images/jantie.jpeg"
import Image from "next/image";
import head from "../../../images/headphono.png"

export default function Header() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isprofile,seIsprofile]=React.useState<boolean>(false)

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handProf = ()=>{
     if(isprofile===false){
       seIsprofile(true)
     }else{
      seIsprofile(false)
     }
  }
  return (
      <>
        <main className="bg-white py-[10px] px-[50px] flex justify-between items-center">
      <div className="flex justify-center items-center gap-[10px]">
      <CheckOutlined className="border-4 border-black p-[5px] rounded-[8px] text-blod"/>
        <h1>DoRoll</h1>
      </div>
      <div className="flex justify-center items-center gap-[30px]">
        <div className="flex justify-center items-center gap-[10px]">
          <HomeOutlined />
          <Link href="/">Home</Link>
        </div>
        <div className="flex justify-center items-center gap-[10px]">
          <SettingOutlined className="text-[#a0d911]"/>
          <Link href="/settingpage">Settings</Link>
        </div>
      </div>
      <div className="flex justify-center items-center gap-[20px]">
        <ButtonComponent  name="New task +" type="primary" pass={showLoading}/>
        <div className="flex justify-center items-center" onClick={handProf}>
           <UserOutlined className="border border-r-gray-200 p-[10px] rounded-tl-[5px] rounded-bl-[5px]"/>
          <UpOutlined className="text-[10px] border  py-[13px] px-[5px] rounded-tr-[5px] rounded-br-[5px]"/>
        </div>
        {isprofile && (
            <div className="bg-white rounded-[5px] absolute top-[56px] right-[2.6%] px-[20px] py-[30px] ">
            <div className="flex gap-[10px] justify-center items-center">
              <Image src={jant} alt="good" className="w-[50px] h-[50px] rounded-[10px]"/>
              <div>
                <h3>Yves Honore B.</h3>
                <p className="text-gray-400 text-[12px]">yveshonore@awesomity.rw</p>
              </div>
             </div>
             <div className="flex flex-col gap-[14px] py-[20px] my-[20px] border-y border-y-gray-200 list-none">
                <li className="flex gap-[10px] justify-start items-center"><UserOutlined/><Link href="/">My Profile</Link></li>
                <li className="flex gap-[10px] justify-start items-center"><Image src={head} alt="head" className="w-[15px] h-[15px]"/><Link href="/">Help</Link></li>
                <li className="flex gap-[10px] justify-start items-center"><ExclamationCircleOutlined /><Link href="/">About</Link></li>
                <li className="flex gap-[10px] justify-start items-center"><FolderOutlined /><Link href="/">Archives</Link></li>
             </div>
               <li className="list-none flex gap-[10px] justify-start items-center"><LogoutOutlined /><Link href="/registrationPage">Logout</Link></li>
           </div>
        )}
        
      </div>
    </main>
      <Modal
        title={<p>New Task</p>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Add task +
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <form action="">
          <div className="flex justify-between">
            <div className="pb-[7px] w-[60%]">
              <label htmlFor="" className="text-[14px]">Title
                <input type="text" placeholder="Enter title" className="w-full bg-[#dddd] text-[13px] p-[7px] rounded-[5px]"/>
              </label>
            </div>
            <div className="pb-[7px] w-[30%]">
              <label htmlFor="" className="text-[14px]">Due Date
                <input type="Date" className="w-full bg-[#dddd] text-[13px] p-[5px] rounded-[5px]"/>
              </label>
            </div>
          </div>
          <div className="pb-[7px]">
              <label htmlFor="" className="text-[14px]">Description
                <textarea name="" id="" placeholder="Enter description" className="w-full bg-[#dddd] text-[13px] p-[5px] rounded-[5px]"/>
              </label>
            </div>
        </form>
      </Modal>
      </>
  );
}
