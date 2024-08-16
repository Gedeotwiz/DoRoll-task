import { useState } from 'react';
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Checkbox,Modal } from 'antd';
// import { useGetTasksQuery } from './redux/task/api/apiSlice';
import {Typography } from 'antd';
import {Tag } from 'antd';

const { Text, Link } = Typography;


export default function Tasks() {
  const [isChecked, setIsChecked] = useState(false);
  const [isopen, setIsopen] = useState(false);

  const handleCheckboxChange = (e:any) => {
    setIsChecked(e.target.checked);
  };
   const showModal = () => {
    setIsopen(true);
   };

   const handleOk = () => {
    setIsopen(false);
  };

  const handleCancel = () => {
    setIsopen(false);
  };

  // const {data:tasks,error,isLoading}=useGetTasksQuery()

  // if (isLoading) return <p className='text-center'>Loading...</p>;
  // if (error) return <p className='text-center text-3xl'>Task not found</p>;

  return (
      <>
      <div className="flex flex-col gap-2.5">
           <div
           className={`flex justify-between items-center hover:bg-gray-200 py-2 px-[20px] ${
             isChecked ? 'text-gray-300' : ''
           }`}
         >
           <div className="flex items-center gap-5 w-[68%]" onClick={showModal}>
             <div className="flex items-center gap-2.5">
               <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
               <p>1</p>
             </div>
             <div className="flex items-center gap-[25px]">
              <Tag color="default">ON-TRACK</Tag>
               <Text className='w-[100px]'>Due: Today</Text>
             </div>
             <div>
             <Text >Run some errands in town</Text>
             </div>
           </div>
           <div className="flex items-center gap-10">
             <div className="flex items-center gap-5">
             <Text >Created:14 july 2024</Text>
               <EditOutlined />
               <DeleteOutlined onClick={showModal}/>
             </div>
             <div>
               <Checkbox onChange={handleCheckboxChange} />
             </div>
           </div>
         </div>


        </div>

        <div className="flex flex-col gap-2.5">
           <div
           className={`flex justify-between items-center hover:bg-gray-200 py-2 px-[20px] ${
             isChecked ? 'text-gray-300' : ''
           }`}
         >
           <div className="flex items-center gap-5 w-[68%]" onClick={showModal}>
             <div className="flex items-center gap-2.5">
               <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
               <p>1</p>
             </div>
             <div className="flex items-center gap-[25px]">
              <Tag color="default">Done</Tag>
               <Text className='w-[100px]'>Due: Today</Text>
             </div>
             <div>
             <Text >Do Nothing</Text>
             </div>
           </div>
           <div className="flex items-center gap-10">
             <div className="flex items-center gap-5">
             <Text >Created:14 Feb 2024</Text>
               <EditOutlined />
               <DeleteOutlined onClick={showModal}/>
             </div>
             <div>
               <Checkbox onChange={handleCheckboxChange} />
             </div>
           </div>
         </div>

         
        </div>


        <div className="flex flex-col gap-2.5">
           <div
           className={`flex justify-between items-center hover:bg-gray-200 py-2 px-[20px] ${
             isChecked ? 'text-gray-300' : ''
           }`}
         >
           <div className="flex items-center gap-5 w-[68%]" onClick={showModal}>
             <div className="flex items-center gap-2.5">
               <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
               <p>1</p>
             </div>
             <div className="flex items-center gap-[25px]">
              <Tag color="error">OFF-TRACK</Tag>
               <Text className='w-[100px]'>Due: Yesterday</Text>
             </div>
             <div>
             <Text >Hit the Gym</Text>
             </div>
           </div>
           <div className="flex items-center gap-10">
             <div className="flex items-center gap-5">
             <Text >Created: 12 july 2024</Text>
               <EditOutlined />
               <DeleteOutlined onClick={showModal}/>
             </div>
             <div>
               <Checkbox onChange={handleCheckboxChange} />
             </div>
           </div>
         </div>

         
        </div>

            <Modal open={isopen} footer={
             <div className='flex justify-between items-center text-[12px]'>
                <Text >Created at 30 july 2024</Text>
                <div className='flex justify-center items-center gap-[10px]'>
                <Button><EditOutlined /></Button>
                <Button onClick={handleOk}><DeleteOutlined /></Button>
              </div>
             </div>
            }>
                <h1 className='font-bold pb-[20px]'>Run some errands in town</h1>
                <div className='flex gap-[20px] pb-[10px]'>
                  <Tag>ON-TRACK</Tag>
                  <Text >Due: Today</Text>
                </div>
                <Text >When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, 
                  you can use Modal to create a new floating layer over the current page to get user feedback or display information.</Text>
            </Modal>
      </>
  );
}
