import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
function AdminLayout(){
    
const [opensidebar,setopensidebar]=useState(false);

    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar open={opensidebar} setopen={setopensidebar} />
            <div className="flex flex-1 flex-col">
               <AdminHeader  setopen={setopensidebar}/>
                <main className="flex-1 flex-col bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default AdminLayout;