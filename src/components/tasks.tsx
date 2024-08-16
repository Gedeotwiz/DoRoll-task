import { useState } from 'react';
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Checkbox,Modal } from 'antd';
import { useGetTasksQuery } from './redux/task/api/apiSlice';


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

  const {data:tasks,error,isLoading}=useGetTasksQuery()

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-3xl'>Task not found</p>;

  return (
      <>
      <div className="flex flex-col gap-2.5">

        {tasks.map((task:any)=>(
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
               <p className="bg-gray-200 py-[5px] px-[18px] rounded-[15px] text-[12px]">{task.status}</p>
               <p className="w-[100px] text-gray-400 text-[12px]">{task.time}</p>
             </div>
             <div>
               <p className='text-[12px]'>{task.title}</p>
             </div>
           </div>
           <div className="flex items-center gap-10">
             <div className="flex items-center gap-5">
               <p className="text-gray-400 text-[12px]">{task.createdAt}</p>
               <EditOutlined />
               <DeleteOutlined onClick={showModal}/>
             </div>
             <div>
               <Checkbox onChange={handleCheckboxChange} />
             </div>
           </div>
         </div>
        ))}
        </div>
        
            <Modal open={isopen} footer={
             <div className='flex justify-between items-center text-[12px]'>
                <span>Created at 30 july 2024</span>
                <div className='flex justify-center items-center gap-[10px]'>
                <Button><EditOutlined /></Button>
                <Button onClick={handleOk}><DeleteOutlined /></Button>
              </div>
             </div>
            }>
                <h1 className='font-bold pb-[20px]'>Run some errands in town</h1>
                <div className='flex gap-[20px] pb-[10px]'>
                  <p className="bg-gray-200 py-[5px] px-[18px] rounded-[15px] text-[14px]">ON-TRACK</p>
                  <p>Due: Today</p>
                </div>
                <span className='text-[12px]'>When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, 
                  you can use Modal to create a new floating layer over the current page to get user feedback or display information.</span>
            </Modal>
      </>
  );
}
