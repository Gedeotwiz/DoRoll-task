import { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal, Typography, Tag } from 'antd';
import {jwtDecode} from "jwt-decode";

const { Text } = Typography;

interface Task {
  id: number;
  status: string;
  time: string;
  title: string;
  createdAt: string;
  description: string;
}

interface TasksData {
  data: Task[];
}

interface DecodedToken {
  userId: number;
  userRole: string;
}

export default function Tasks() {
  const [isChecked, setIsChecked] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [tasks, setTasks] = useState<TasksData>({ data: [] }); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        
        const decoded: DecodedToken = jwtDecode(token);
        const { userId, userRole } = decoded;

        console.log({ userId, userRole })
        if(userRole==='admin'){}
        let endpoint = 'http://localhost:3000/API/V1/tasks';
        if (userRole === 'user') {
          endpoint = `http://localhost:3000/API/V1/tasks?userId=${userId}`;
        }
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data: TasksData = await response.json(); 

        setTasks(data); 
        setIsLoading(false);
      } catch (error) {
        const err = error as Error;
        console.error('Error:', error);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

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

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-3xl'>{error}</p>;

  return (
    <>
      <div className="flex flex-col gap-2.5">
        {tasks.data.map((item: Task, index: number) => (
          <div key={item.id}>
            <div
              className={`flex justify-between items-center hover:bg-gray-200 py-2 px-[20px] ${isChecked ? 'text-gray-300' : ''}`}
            >
              <div className="flex items-center gap-5 w-[68%]" onClick={showModal}>
                <div className="flex items-center gap-2.5">
                  <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
                  <p>{index + 1}</p>
                </div>
                <div className="flex items-center gap-[25px]">
                  <div className='w-[160px]'>
                    <Tag color="default">{item.status}</Tag>
                  </div>
                  <Text className='w-[150px]'>{item.time}</Text>
                </div>
                <div>
                  <Text>{item.title}</Text>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-5">
                  <Text>{item.createdAt}</Text>
                  <EditOutlined />
                  <DeleteOutlined onClick={showModal} />
                </div>
                <div>
                  <Checkbox onChange={handleCheckboxChange} />
                </div>
              </div>
            </div>
            <Modal
              open={isopen}
              footer={
                <div className='flex justify-between items-center text-[12px]'>
                  <Text>{item.createdAt}</Text>
                  <div className='flex justify-center items-center gap-[10px]'>
                    <Button><EditOutlined /></Button>
                    <Button onClick={handleOk}><DeleteOutlined /></Button>
                  </div>
                </div>
              }
            >
              <h1 className='font-bold pb-[20px]'>{item.title}</h1>
              <div className='flex gap-[20px] pb-[10px]'>
                <div className='w-[160px]'>
                  <Tag>{item.status}</Tag>
                </div>
                <Text className='w-[150px]'>{item.time}</Text>
              </div>
              <Text>{item.description}</Text>
            </Modal>
          </div>
        ))}
      </div>
    </>
  );
}
