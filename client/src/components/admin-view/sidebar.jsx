import { Fragment } from "react"
import { Hospital } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { ShoppingBasket } from "lucide-react"
import { LayoutDashboard } from "lucide-react"
import { BringToFront } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
const adminSidebarMenuItems=[
    {
        id:'products',
        label:'products',
        path:'/admin/product',
        icon:<ShoppingBasket />
    },
    {
        id:'dashboard',
        label:'Dashboard',
        path:'/admin/dashboard',
        icon:<LayoutDashboard />
    },
     {
        id:'Order',
        label:'Order',
        path:'/admin/Order',
        icon:<BringToFront />
    }
    
]

function MenuItems({setopen}){
       const navigate=useNavigate()
    return <nav className="mt-8 flex-col flex gap-2">
        {
            adminSidebarMenuItems.map(menuItem=><div key={menuItem.id} onClick={()=>{navigate(menuItem.path); setopen?setopen(false):null;}} className="flex items-center gap- rounded-2 px-2 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
                 {menuItem.icon}
                 <span>{menuItem.label}</span>
            </div>)
        }
    </nav>
}


function AdminSidebar({open,setopen}){
    const navigate=useNavigate()
   return <Fragment>
    <Sheet open={open} onOpenChange={setopen} >
<SheetContent side="left" className="w-64">
    <div className="flex flex-col h-full">
<SheetHeader className="border-b">
<SheetTitle className="flex gap-2 ">
    <Hospital />
   <span>AdminPanel</span> 
</SheetTitle>
</SheetHeader>
<MenuItems setopen={setopen}/>
    </div>

</SheetContent>
    </Sheet>
    <aside  className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
<div className="flex items-center gap-2" onClick={()=>navigate("/admin/dashboard")}>
    <Hospital />
<h1 className="text-l font-extrabold ">Admin Panel</h1>
</div>
<MenuItems/>
    </aside>
   </Fragment>
}
export default AdminSidebar