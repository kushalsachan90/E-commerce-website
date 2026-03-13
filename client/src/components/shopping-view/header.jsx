import { Link, useNavigate } from "react-router-dom";
import { House, Menu, ShoppingCart, User, LogOut } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../config";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logOutUser } from "@/store/auth-slice";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import UserCartItemsWrapper from "./cart-items-content";
import { fetchCartItem } from "@/store/cart-slice";
import { Label } from "../ui/label";
// ---------- Menu Items Component ----------
function MenuItems() {
  const navigate=useNavigate();
 function handleNavigate(getcurrentMenuItem){
  sessionStorage.removeItem('filters');
  const currentfilter=getcurrentMenuItem.id!=='home'?{
    category:[getcurrentMenuItem.id]
  }:null
  sessionStorage.setItem('filters',JSON.stringify(currentfilter))
  navigate(getcurrentMenuItem.path)
 }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row mt-10">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
        
          key={menuItem.id}
          to={menuItem.path}
          // onClick={onItemClick} // <-- Close sheet on mobile when a menu item is clicked
          onClick={()=>handleNavigate(menuItem)}
          className="text-medium font-medium rounded-3 hover:bg-muted cursor-pointer hover:text-foreground ml-5"
        >
          {menuItem.label}
     
        </Label>
       
      ))}
    </nav>
  );
}

// ---------- Header Right Content (Avatar + Cart) ----------
function HeaderRightContent({ onItemClick }) {  // <-- receive onItemClick to close sheet
  const { user } = useSelector((state) => state.auth);
   const {cartItems}=useSelector(state=>state.cartProduct)


  const [opencartSheet ,setOpenCartSheet]=useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogOutUser() {
    dispatch(logOutUser());
    onItemClick?.(); // <-- Close sheet when logout is clicked (mobile)
  }

   useEffect(()=>{
    dispatch(fetchCartItem(user.id))
   },[dispatch])

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">

     <Sheet open={opencartSheet} onOpenChange={setOpenCartSheet}>
   <Button variant="outline" size="icon" className="ml-5" onClick={()=>setOpenCartSheet(true)}>
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <UserCartItemsWrapper cartItems={cartItems && cartItems.items&& cartItems.items.length>0?cartItems.items:[]} />
     </Sheet>

   

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ml-5">
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* ---------- Account Item: Close sheet on mobile ---------- */}
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/Account");  // Navigate
              onItemClick?.();            // <-- Close sheet on mobile
            }}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* ---------- Logout Item: also closes sheet ---------- */}
          <DropdownMenuItem onClick={handleLogOutUser}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ---------- Main Shopping Header ----------
function ShoppingHeader() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">E-commerce</span>
        </Link>

        {/* ---------- Mobile Sheet ---------- */}
        <Sheet open={sheetOpen} onOpenChange={(open) => setSheetOpen(open)}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems onItemClick={() => setSheetOpen(false)} />  {/* <-- close sheet when link clicked */}
            <HeaderRightContent onItemClick={() => setSheetOpen(false)} />  {/* <-- close sheet when "Account" clicked */}
          </SheetContent>
        </Sheet>

        {/* ---------- Desktop Menu ---------- */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;