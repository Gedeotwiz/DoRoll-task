import {InstagramOutlined,LinkedinOutlined,XOutlined} from "@ant-design/icons"
export default function Footer() {
    return (
      <div className="w-full bg-[#dddd] flex justify-between items-center px-[50px] py-[20px]">
         <div className="flex items-center justify-center gap-[20px]">
          <p role="bottom" >&copy;2023&. DoRoll </p>
          <p role="footer" className="text-gray-400">By Awesomity  Ltd</p>
         </div>
        <div className="flex items-center justify-center gap-[13px]">
        <XOutlined />
        <InstagramOutlined />
        <LinkedinOutlined />
        </div>
      </div>
    );
  }
  