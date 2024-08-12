
import Header from "@/components/shared/layout/header";
import Footer from "@/components/shared/layout/footer";
import {SearchOutlined,EyeOutlined} from "@ant-design/icons";
import {Input ,Button}from "antd"

const Home = () => {
  
  
  return (
    <>
      <Header/>
       <div className="bg-[#dddd] h-[85vh] py-[20px] px-[50px]">
         <div className="bg-white rounded-[10px] flex justify-between items-center p-[10px]">
           <div>
             <h1>Pending Task -7</h1>
           </div>
           <div>
           <Input type="text" className="bg-[#eeee] w-[400px] rounded-[5px] p-[4px] text-[12px]" placeholder="Search Task" prefix={<SearchOutlined className="text-[12px] text-[#c0d310]"/>}
                suffix={<EyeOutlined className="text-[12px] text-[#c0d310]"/>}
                />
           </div>
           <div>dsdgfh</div>
         </div>
         <div className="flex justify-between items-center pt-[20px] gap-[10px]">
           <div className="bg-white w-[35%] rounded-[10px] p-[20px] h-[75vh]">
            <h1>Summary</h1>
           </div>
           <div className="bg-white w-full rounded-[10px] p-[20px] h-[75vh]">
             <h1>dfsfthghj</h1>
           </div>
         </div>
       </div>
     <Footer/>
    </>
  );
};

export default Home;

