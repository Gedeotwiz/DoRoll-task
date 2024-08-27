import {InfoCircleOutlined,CheckOutlined,FileProtectOutlined,IssuesCloseOutlined} from "@ant-design/icons";
import {Card,Statistic}from "antd"
import { useGetTasksQuery } from "./redux/task/api/apiSlice";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  time:string
  status: 'ON-TRACK' | 'OFF-TRACK' | 'DONE';
  createdAt: string;
}


export default function Percent(){

    const { data: tasks, isLoading, error } = useGetTasksQuery();
    const [onTrackCount, setOnTrackCount] = useState(0);
    const [offTrackCount, setOffTrackCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
  
    useEffect(() => {
      if (tasks) {
        const total = tasks.data.length;
        const onTrack = tasks.data.filter((task:Task) => task.status === 'ON-TRACK').length;
        const offTrack = tasks.data.filter((task:Task) => task.status === 'OFF-TRACK').length;
        const done = tasks.data.filter((task:Task) => task.status === 'DONE').length;
  
        setOnTrackCount(onTrack);
        setOffTrackCount(offTrack);
        setDoneCount(done);
        setTotalCount(total);
      }
    }, [tasks]);
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading tasks.</p>;
    return (
        <div className="flex flex-wrap gap-2 justify-center">
        <Card
         className="shadow-sm rounded-lg w-[47%] p-3"
         style={{borderRadius: "6px",border: "1px solid #e0e0e0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={totalCount} precision={0} valueStyle={{ fontSize: "20px", color: "#1f2937" }}/>
             <span style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           
           <FileProtectOutlined
             style={{ fontSize: "20px", color: "#9ca3af" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Total Tasks</div>
        </Card>

        <Card
         className="shadow-sm rounded-lg w-[47%] p-3"
         style={{borderRadius: "6px",border: "1px solid #e0e0e0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={doneCount} precision={0} valueStyle={{ fontSize: "20px", color: "#1f2937" }}/>
             <span style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           <CheckOutlined
             style={{ fontSize: "20px", color: "#9ca3af" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Completed</div>
        </Card>

        <Card
         className="shadow-sm rounded-lg w-[47%] p-3"
         style={{borderRadius: "6px",border: "1px solid #e0e0e0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={onTrackCount} precision={0} valueStyle={{ fontSize: "20px", color: "#1f2937" }}/>
             <span style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           <InfoCircleOutlined
             style={{ fontSize: "20px", color: "#9ca3af" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Pending</div>
        </Card>

        <Card
         className="shadow-sm rounded-lg w-[47%] p-3"
         style={{borderRadius: "6px",border: "1px solid #e0e0e0",padding: "8px", }} >
         <div className="flex justify-between items-center">
           <div className="flex items-start">
             <Statistic value={offTrackCount} precision={0} valueStyle={{ fontSize: "20px", color: "#1f2937" }}/>
             <span style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px",}} >
               +10%
             </span>
           </div>
           <IssuesCloseOutlined
             style={{ fontSize: "20px", color: "#9ca3af" }}
           />
         </div>
         <div className="mt-1 text-gray-500 text-xs">Off-Track</div>
        </Card>
        </div>
    )
}