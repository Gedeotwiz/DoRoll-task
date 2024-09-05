import { useState, useEffect, ChangeEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Input, Modal, message, Typography, Tag, notification } from 'antd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useGetTasksQuery, useUpdateTaskStatusMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../redux/task/api/apiSlice';
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

export default function AdminTask({ searchTerm, filterStatus, timeFilter }: { searchTerm: string, filterStatus: string, timeFilter: string }) {
  const [role, setRole] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const { data, error, isLoading } = useGetTasksQuery();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      setRole(decoded.userRole);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setTasks(data.data);
    }
  }, [data]);


  const filteredTasks = tasks.filter((task) => {
    const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterStatus = filterStatus ? task.status === filterStatus : true;
  
    let matchesTimeFilter = true;
  
    if (timeFilter) {
      const taskDate = new Date(task.createdAt);
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);
  
      switch (timeFilter) {
        case 'daily':
          matchesTimeFilter = taskDate.toDateString() === today.toDateString();
          break;
        case 'weekly':
          matchesTimeFilter = taskDate >= startOfWeek;
          break;
        case 'monthly':
          matchesTimeFilter = taskDate >= startOfMonth;
          break;
        default:
          matchesTimeFilter = true;
          break;
      }
    }
  
    return matchesSearchTerm && matchesFilterStatus && matchesTimeFilter;
  });

  const handleCheckboxChange = async (taskId: number) => {
    const updatedTask = tasks.find(task => task.id === taskId);
    if (updatedTask) {
      const updatedTaskStatus = updatedTask.status === 'DONE' ? 'ON-TRACK' : 'DONE';
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: updatedTaskStatus } : task
        )
      );
      try {
        await updateTaskStatus({ id: taskId, status: updatedTaskStatus }).unwrap();
        notification.success({
          message: 'Task status updated successfully'
        });
      } catch (error) {
        notification.error({
          message: 'Failed to update task status'
        });
        console.error(error);

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
    setTitle(task.title);
    setDescription(task.description);
    setTime(task.time);
    setIsOpen(true);
  };

  const showModalView = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setTime(task.time);
    setIsView(true);
  };

  const handleSubmit = async (taskId: number) => {
    setLoading(true);
    try {
      await updateTask({ id: taskId, title, description, time }).unwrap();
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, title, description, time } : task
        )
      );
      notification.success({
        message: 'Task successfully updated'
      });
      setIsOpen(false);
    } catch (error) {
      notification.error({
        message: 'Failed to update task'
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId).unwrap();
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      notification.success({
        message: 'Task successfully deleted'
      });
    } catch (error) {
      notification.error({
        message: 'Failed to delete task'
      });
      console.error('Failed to delete task:', error);
    }
  };

  const handleOk = () => {
    setIsView(false);
  };

  const handleCancel = () => {
    setIsView(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleOnDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-3xl">No task found</p>;

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasksList">
          {(provided:any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col"
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided:any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex justify-between items-center hover:bg-gray-200 py-2 px-4 ${task.status === 'DONE' ? 'text-gray-300 cursor-not-allowed' : ''}`}
                    >
                      <div
                        className={`flex items-center gap-5 w-[70%] ${task.status !== 'DONE' ? 'cursor-pointer' : ''}`}
                        onClick={() => task.status === 'DONE' || showModalView(task)}
                      >
                        <div className="flex items-center gap-2.5">
                          <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
                          <p className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}>{index + 1}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-28">
                            <Tag color={task.status === 'ON-TRACK' ? 'default' : task.status === 'DONE' ? 'success' : 'error'}>
                              {task.status}
                            </Tag>
                          </div>
                          <Text className={`${task.status === 'DONE' ? 'text-gray-300' : task.status === 'OFF-TRACK' ? 'text-red-300' : ''}`}>
                            Due: {task.time}
                          </Text>
                        </div>
                        <Text className={`${task.status === 'DONE' ? 'text-gray-300' : task.status === 'OFF-TRACK' ? 'text-red-300' : ''}`}>
                          {task.title}
                        </Text>
                      </div>
                      <div className="flex items-center gap-5">
                        <Text className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}>Created: {new Date(task.createdAt).toLocaleDateString()}</Text>
                        <EditOutlined
                          className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}
                          onClick={() => showModal(task)}
                        />
                        <DeleteOutlined
                          className={`${task.status === 'DONE' ? 'text-gray-300' : ''}`}
                          onClick={() => task.status === 'DONE' || handleDeleteTask(task.id)}
                        />
                        <Checkbox
                          onChange={() => handleCheckboxChange(task.id)}
                          checked={task.status === 'DONE'}
                          disabled={task.status === 'DONE'}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {selectedTask && (
        <div>
            <Modal
        open={isView}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-between items-center text-xs'>
            <Text>Created at {new Date(selectedTask.createdAt).toLocaleDateString()}</Text>
            <div className='flex justify-center items-center gap-2'>
              <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(selectedTask)} disabled={selectedTask.status === 'DONE'}>Edit</Button>
              <Button danger icon={<DeleteOutlined />}
                 onClick={() => selectedTask.status === 'DONE' && handleDeleteTask(selectedTask.id)}
              >Delete</Button>
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
          title="Edit Task"
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={
            <Button type="primary" onClick={() => handleSubmit(selectedTask.id)} loading={loading}>
              Edit Task
            </Button>
          }
        >
          <form>
            <div className="flex justify-between items-center">
              <div className="pb-[7px] w-[60%]">
                <label htmlFor="title">Title
                  <Input
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="pb-[7px] w-[30%]">
                <label htmlFor="dueDate">Due Date
                  <DatePicker onChange={onDateChange} format="MM/DD/YYYY" />
                </label>
              </div>
            </div>

            <div className="pb-[7px]">
              <label htmlFor="description">Description
                <TextArea
                  name="description"
                  rows={4}
                  placeholder="Enter description"
                  value={description}
                  onChange={handleInputChange}
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
