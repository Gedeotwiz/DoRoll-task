import { useState } from 'react';  
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";  
import { Button, Checkbox, Modal } from 'antd';  
import { useGetTasksQuery } from './redux/task/api/apiSlice';  
import { Typography } from 'antd';  
import { Tag } from 'antd';  

const { Text } = Typography;  

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

  const { data: tasks, error, isLoading } = useGetTasksQuery();  

  // Optionally handle loading states:  
  // if (isLoading) return <p className='text-center'>Loading...</p>;  
  // if (error) return <p className='text-center text-3xl'>Task not found</p>;  

  return (  
    <>  
      <div className="flex flex-col "> {/* Center and limit width for better layout */}  
        {/* Example task display */}  
        {[1, 2, 3].map((index) => ( // Replace with actual task data  
          <div key={index} className={`flex justify-between items-center hover:bg-gray-200 py-2 px-4 ${  
              isChecked ? 'text-gray-300' : ''  
            }`}>  
            <div className="flex items-center gap-5 w-[70%]" onClick={showModal}>  
              <div className="flex items-center gap-2.5">  
                <HolderOutlined style={{ transform: 'rotate(90deg)' }} />  
                <p>{index}</p>  
              </div>  
              <div className="flex items-center gap-4">  
                <div className='w-28'>
                <Tag color={index === 1 ? "default" : index === 2 ? "success" : "error"}>  
                  {index === 1 ? "ON-TRACK" : index === 2 ? "DONE" : "OFF-TRACK"}  
                </Tag>  
                </div>
                <Text>Due: Today</Text>  
              </div>  
              <Text>Task description here</Text>  
            </div>  
            <div className="flex items-center gap-5">  
              <Text>Created: {new Date().toLocaleDateString()}</Text>  
              <EditOutlined />  
              <DeleteOutlined onClick={showModal} />  
              <Checkbox onChange={handleCheckboxChange} />  
            </div>  
          </div>  
        ))}  
      </div>  

      <Modal   
        open={isopen}   
        onOk={handleOk}   
        onCancel={handleCancel}  
        footer={  
          <div className='flex justify-between items-center text-xs'>  
            <Text>Created at {new Date().toLocaleDateString()}</Text>  
            <div className='flex justify-center items-center gap-2'>  
              <Button type="primary" icon={<EditOutlined />}>Edit</Button>  
              <Button danger onClick={handleOk} icon={<DeleteOutlined />}>Delete</Button>  
            </div>  
          </div>  
        }  
      >  
        <h1 className='font-bold pb-4'>Task Title Here</h1>  
        <div className='flex gap-4 pb-2'>  
          <Tag color="default">ON-TRACK</Tag>  
          <Text>Due: Today</Text>  
        </div>  
        <Text>  
          A detailed description of the task goes here. Include any important information or instructions.  
        </Text>  
      </Modal>  
    </>  
  );  
}