
import Header from "@/components/shared/layout/header";
import Footer from "@/components/shared/layout/footer";
import {SearchOutlined,HolderOutlined,} from "@ant-design/icons";
import {Input ,}from "antd"
import Tasks from "@/components/tasks";
import filter from "../images/filter.png"
import Image from "next/image";
import Percent from "@/components/percent";

const Home = () => {
  
  
  return (
    <>
      <Header/>
       <div className="bg-[#dddd] h-[88vh] py-[20px] px-[50px]">
         <div className="bg-white rounded-[10px] flex justify-between items-center p-[10px]">
           <div>
             <h1>Pending Task -7</h1>
           </div>
           <div className="w-[400px]">
           <Input type="text" variant="filled" placeholder="Search Task" prefix={<SearchOutlined className=" text-[#c0d310]"/>}
             suffix={<Image src={filter} alt="icon" className="w-[20px]"/>}/>
            </div>
           <div>dsdgfh</div>
         </div>
         <div className="flex justify-between items-center pt-[20px] gap-2">
           <div className="bg-white w-[35%] rounded-[10px] p-[20px] h-[75vh] flex flex-col justify-between">
             <div>
               <h1>Summary</h1>
               <Percent/>
             </div>
             <div className="bg-[#eeee] rounded-[10px] p-[10px]">
                <h1 className="text-[15px] pb-[5px]">Daily Tip:</h1>
                 <div className="flex justify-start items-center gap-[10px]">
                     <div className="bg-white py-[7px] px-[10px] rounded-[5px]">
                       <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
                     </div>
                 
                     <div>
                      <p className="text-[12px]">Drag Tool</p>
                      <span className="text-[10px]">Use this icon on the left to re-arrange tasks</span>
                    </div>
                 </div>
                 
             </div>
           </div>
           <div className="bg-white w-full rounded-[10px] py-[20px] h-[75vh]">
              <Tasks/>
           </div>
         </div>
       </div>
     <Footer/>
    </>
  );
};

export default Home;

