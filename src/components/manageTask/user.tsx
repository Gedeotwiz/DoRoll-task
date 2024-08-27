import { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Input, Modal } from 'antd';
import { useGetTaskRelatedToUserIdQuery, 
  useUpdateTaskStatusMutation,useUpdateTaskMutation, useDeleteTaskMutation } from '../redux/task/api/apiSlice';
import { Typography, Tag } from 'antd';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd';

const { Text } = Typography;

const { TextArea } = Input;

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'ON-TRACK' | 'OFF-TRACK' | 'DONE';
  time: string;
  createdAt: string;
}

export default function UserTask() {
  const { data, error, isLoading } = useGetTaskRelatedToUserIdQuery();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [time,setTime]=useState('')

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [updateTask]=useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    if (data) {
      setTasks(data.data);
    }
  }, [data]);

  const handleCheckboxChange = async (taskId: number) => {
    const updatedTask = tasks.find(task => task.id === taskId);
    if (updatedTask) {
      try {
        await updateTaskStatus({ id: taskId, status: 'DONE' }).unwrap();
      } catch (error) {
        console.error('Failed to update task status:', error);
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, status: updatedTask.status } : task
          )
        );
      }
    }
  };

  const onDateChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
    if (Array.isArray(dateString)) {
      setTime(dateString[0] || '');
    } else {
      setTime(dateString);
    }
  };

  const showModal = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSubmit= async(taskId: number)=>{
    const updatedTask = tasks.find(task => task.id === taskId);
     try {
      if(updatedTask){
        await updateTask({id: taskId,title,description,time}).unwrap();
         alert('Task successfuly updated')
      }else{
        alert('Task not found')
      }
       
     } catch (error) {
       console.log(error)
     }
  }

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId).unwrap(); 
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId)); 
      alert('Task successfully deleted');
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete the task');
    }
  };
 

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-3xl'>Error retrieving tasks</p>;

  return (
    <>
      <div className="flex flex-col">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`flex justify-between items-center hover:bg-gray-200 py-2 px-4 ${task.status === 'DONE' ? 'text-gray-300 cursor-not-allowed' : ''
              }`}
          >
            <div
              className={`flex items-center gap-5 w-[70%] ${task.status !== 'DONE' ? 'cursor-pointer' : ''}`}
              onClick={() => task.status !== 'DONE' && showModal(task)} 
            >
              <div className="flex items-center gap-2.5">
                <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
                <p className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}>{index + 1}</p>
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
              <EditOutlined className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}
               onClick={() => task.status !== 'DONE' && showModal(task)} 
              />
              <DeleteOutlined  className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`} 
               onClick={() => task.status !== 'DONE' && showModal(task)}
              />
              <Checkbox
                onChange={() => handleCheckboxChange(task.id)}
                checked={task.status === 'DONE'}
                disabled={task.status === 'DONE'}
              />
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div>
          <Modal
          open={isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <div className='flex justify-between items-center text-xs'>
              <Text>Created at {new Date(selectedTask.createdAt).toLocaleDateString()}</Text>
              <div className='flex justify-center items-center gap-2'>
                <Button type="primary" icon={<EditOutlined />} onClick={showLoading} disabled={selectedTask.status === 'DONE'}>Edit</Button>
                <Button onClick={() => selectedTask.status !== 'DONE' && handleDeleteTask(selectedTask.id)} icon={<DeleteOutlined />}>Delete</Button>
              </div>
            </div>
          }
        >
          <h1 className='font-bold pb-4'>{selectedTask.title}</h1>
          <div className='flex gap-4 pb-2'>
            <Tag color={selectedTask.status === 'ON-TRACK' ? "default" : selectedTask.status === 'DONE' ? "success" : "error"}>
              {selectedTask.status}
            </Tag>
            <Text>Due: {selectedTask.time}</Text>
          </div>
          <Text>
            {selectedTask.description}
          </Text>
        </Modal>
        
          <Modal
        title="New Task"
        footer={
          <Button type="primary" onClick={() => handleSubmit(selectedTask.id)} loading={loading}>
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
                value={selectedTask.title}
                onChange={(e:any) => setTitle(e.target.value)}
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
                value={selectedTask.description}
                onChange={(e:any) => setDescription(e.target.value)}
              />
            </label>
          </div>
        </form>
          </Modal>
        </div> 
      )}
    </>
  );
}
