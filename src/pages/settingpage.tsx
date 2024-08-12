import Header from "@/components/shared/layout/header"
import Footer from "@/components/shared/layout/footer"
import EditProfile from "@/components/editProfile"

export default function SettingPage(){
    return (
        <>
          <Header/>
          <div className="bg-[#dddd] h-[85vh] w-full flex justify-center items-center">
            <EditProfile/>
          </div>
          <Footer/>
        </>
    )
}