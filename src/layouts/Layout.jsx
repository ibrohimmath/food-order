import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout relative flex items-start">
      <Sidebar />
      <div className="relative w-full min-h-[100vh] h-fit bg-[#252836] p-[1.2rem_2rem_1.2rem_7rem]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
