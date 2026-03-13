
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/store/auth-slice";
function AdminHeader({setopen}){
   const dispatch=useDispatch()
function handleLogOut(){
 dispatch(logOutUser())
}

   return <header className="flex items-center justify-between px-4 py-3 bg-background border-b ">
         <Button onClick={()=>setopen(true)} className="lg:hidden sm:block ">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
         </Button>
         <div className="flex flex-1 justify-end">
            <Button onClick={handleLogOut}className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
             <LogOut />
            <span >LogOut</span>
                
            </Button>
            
         </div>
   </header>
}
export default AdminHeader;