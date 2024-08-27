import { useState} from 'react';  
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";  
import { Checkbox} from 'antd';  
import { useGetTasksQuery } from '../redux/task/api/apiSlice';  
import { Typography, Tag } from 'antd'; 

const { Text } = Typography;  

export default function AdminTask() {  
  const [isChecked, setIsChecked] = useState(false);     

  const handleCheckboxChange = (e: any) => {  
    setIsChecked(e.target.checked);  
  };
  
  const handles=()=>{
     alert("Please you have not access to update and delete task")
  }  
  const { data, error, isLoading } = useGetTasksQuery()
    

  if (isLoading) return <p className='text-center'>Loading...</p>;  
  if (error) return <p className='text-center text-3xl'>Error retrieving tasks</p>;  

  return (  
    <>  
      <div className="flex flex-col ">   
        {data.data.map((task: any,index:number) => (  
          <div key={task.id} className={`flex justify-between items-center hover:bg-gray-200 py-2 px-4 ${  
              isChecked ? 'text-gray-300' : ''  
            }`}>  
            <div className="flex items-center gap-5 w-[70%]">  
              <div className="flex items-center gap-2.5">  
                <HolderOutlined style={{ transform: 'rotate(90deg)' }} />  
                <p className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}>{index +1}</p>  
              </div>  
              <div className="flex items-center gap-4">  
                <div className='w-28'>
                <Tag color={task.status === 'ON-TRACK' ? "default" : task.status === 'DONE' ? "default" : "error"}>  
                  {task.status}
                </Tag>  
                </div>
                <Text className={`${task.status === 'DONE' ? 'text-gray-300' : task.status === 'OFF-TRACK' ? 'text-red-300' :''}`}>Due: {(task.time)}</Text>  
              </div>  
              <Text className={`${task.status === 'DONE' ? 'text-gray-300' : task.status === 'OFF-TRACK' ? 'text-red-300' : ''}`}>
              {task.title}
              </Text>
            </div>  
            <div className="flex items-center gap-5">  
              <Text className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}>Created: {new Date(task.createdAt).toLocaleDateString()}</Text>  
              <EditOutlined onClick={handles}/>  
              <DeleteOutlined onClick={handles} className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}/>  
              <Checkbox onChange={handleCheckboxChange} className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}/>  
            </div>  
          </div>  
        ))}  
      </div>  
    </>  
  );  
}
