
import { useState, useEffect } from 'react';  
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";  
import { Button, Checkbox, Modal } from 'antd';  
import { useSearchTaskQuery } from '../redux/task/api/apiSlice';  
import { Typography, Tag } from 'antd'; 
import {jwtDecode} from "jwt-decode"; 

const { Text } = Typography;  

export default function TaskSearched({ searchTerm }: { searchTerm: string }) {  
  const [isChecked, setIsChecked] = useState(false);  
  const [isopen, setIsopen] = useState(false);  
  const [Role, setUserRole] = useState<string | null>(null);  

  const handleCheckboxChange = (e: any) => {  
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token); 
      setUserRole(decoded.userRole);
    }
  }, []);
  console.log(Role)
  const { data, error, isLoading } = useSearchTaskQuery() 

  if (isLoading) return <p className='text-center'>Loading...</p>;  
  if (error) return <p className='text-center text-3xl'>Error retrieving tasks</p>;  

  return (  
    <>  
      <div className="flex flex-col ">   
        {data.data.map((task: any,index:number) => (  
          <div key={task.id} className={`flex justify-between items-center hover:bg-gray-200 py-2 px-4 ${  
              isChecked ? 'text-gray-300' : ''  
            }`}>  
            <div className="flex items-center gap-5 w-[70%]" onClick={showModal}>  
              <div className="flex items-center gap-2.5">  
                <HolderOutlined style={{ transform: 'rotate(90deg)' }} />  
                <p>{index +1}</p>  
              </div>  
              <div className="flex items-center gap-4">  
                <div className='w-28'>
                <Tag color={task.status === 'ON-TRACK' ? "default" : task.status === 'DONE' ? "success" : "error"}>  
                  {task.status}
                </Tag>  
                </div>
                <Text>Due: {(task.time)}</Text>  
              </div>  
              <Text>{task.title}</Text>  
            </div>  
            <div className="flex items-center gap-5">  
              <Text>Created: {task.createdAt}</Text>  
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
