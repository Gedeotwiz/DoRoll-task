
import type { AppProps } from "next/app";
import Header from "@/components/shared/layout/header";
import Footer from "@/components/shared/layout/footer";
import React, { useEffect, useState } from "react";
import { SearchOutlined, HolderOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import Tasks from "@/components/tasksOparetion";
import filter from "../images/filter.png";
import Image from "next/image";
import Percent from "@/components/percent";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "../components/privent"
import { useGetTaskRelatedToUserIdQuery, useGetTasksQuery } from "@/components/redux/task/api/apiSlice";

interface Task {
  status: 'ON-TRACK' | 'OFF-TRACK' | 'DONE';
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState('');
  const [timeFilter, setTimeFilter] = useState<string>('');
  const { data: task} = useGetTaskRelatedToUserIdQuery();
  const { data: tasks } = useGetTasksQuery();
  const [uTask, setUTask] = useState(0);
  const [iTask, setITask] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [pendingNumber, setPendingNumber] = useState(0);

  useEffect(() => {
    if (task) {
      const doneTasks = task.data.filter((task: Task) => task.status === 'ON-TRACK').length;
      console.log(doneTasks)
      setUTask(doneTasks);
    }
    if (tasks) {
      const doneTasks = tasks.data.filter((task: Task) => task.status === 'ON-TRACK').length;
      setITask(doneTasks);
    }
  }, [task, tasks]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setRole(decoded.userRole);
    }
  }, []);

  useEffect(() => {
    if (role === 'user') {
      setPendingNumber(uTask);
    } else if (role === 'admin') {
      setPendingNumber(iTask);
    }
    console.log('Role:', role);
    console.log('uTask:', uTask);
    console.log('iTask:', iTask);
    console.log('Pending Number:', pendingNumber);
  }, [role, uTask, iTask]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (value: string) => {
    setFilterStatus(value);
  };

  return (
    
    <PrivateRoute>
          <Header />
          <div className="bg-[#dddd] lg:h-[88vh] md:h-auto py-[20px] lg:px-[50px] md:px-[15px] sm:px-[15px] xm:px-[15px]">
        <div className="bg-white rounded-[10px] flex justify-between items-center p-[10px]">
          <div>
            <h1>Pending Task - {pendingNumber}</h1>
          </div>
          <div className="w-[400px]">
            <Input
              type="text"
              variant="filled"
              placeholder="Search Task"
              prefix={<SearchOutlined className="text-[#c0d310]" />}
              suffix={<Image src={filter} alt="icon" className="w-[20px]" />}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="w-[200px]">
            <Select
              className="w-full z-0"
              showSearch
              suffixIcon={<Image src={filter} alt="icon" className="w-[20px]" />}
              onChange={handleFilter}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { value: '', label: 'Filter List' },
                { value: 'DONE', label: 'Done' },
                { value: 'ON-TRACK', label: 'On-track' },
                { value: 'OFF-TRACK', label: 'Off-track' },
              ]}
              defaultValue=""
            />
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-col sm:flex-col xm:flex-col items-center pt-[20px] gap-2">
  
        <div className="bg-white lg:w-[25%] md:w-full sm:w-full xs:w-full rounded-[10px] p-6 lg:h-[75vh] md:h-auto flex flex-col justify-between">
           <div>
              <h1>Summary</h1>
                <div className="w-full flex flex-grow justify-center items-center py-4">
               <Select
          className="w-[96%] hidden lg:block md:clear-none"
          showSearch
          suffixIcon={<Image src={filter} alt="icon" className="w-[20px]" />}
          onChange={(value) => setTimeFilter(value)}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Show" },
            { value: "daily", label: "Today" },
            { value: "weekly", label: "This Week" },
            { value: "monthly", label: "This Month" },
          ]}
          defaultValue=""
        />
      </div>

      <Percent />
    </div>
    <div className="bg-[#eeee] hidden lg:block md:clear-none rounded-[10px] p-[10px]">
      <h1 className="text-[15px] pb-[5px]">Daily Tip:</h1>
      <div className="flex justify-between items-center gap-4">
        <HolderOutlined style={{ transform: "rotate(90deg)" }} />
        <p>
          "If the problem can be solved with action, you don’t have a problem.
          <span className="text-[#c0d310]"> You have an opportunity.</span>"
        </p>
      </div>
    </div>
        </div>
        <div className="bg-white lg:w-[75%] md:w-full sm:w-full xs:w-full rounded-[10px] py-6 h-[75vh] overflow-y-scroll">
           <Tasks searchTerm={searchTerm} filterStatus={filterStatus} />
         </div>
      </div>
      </div>
      <Footer />
    </PrivateRoute>
  );
};

export default Home;
