// import { SheetContent,SheetHeader,SheetTitle } from "../ui/sheet"
// import { Button } from "../ui/button"
// import UserCartWrapper from "./cart-wrapper"

// import { useNavigate } from "react-router-dom"

//  function UserCartItemsWrapper({cartItems,setOpenCartSheet}){
//   console.log(cartItems,"items from header")
//   const navigate=useNavigate()
// const totalCartAmount = cartItems && cartItems.length > 0
//   ? cartItems.reduce(
//       (sum, currentItem) =>
//         sum +
//         (currentItem.salePrice > 0
//           ? currentItem.salePrice
//           : currentItem.price) *
//           currentItem.quantity,
//       0
//     )
//   : 0;
//   return <SheetContent className="sm:max-w-md">
//     <SheetHeader>
//         <SheetTitle>
// Your Cart
//         </SheetTitle>
//     </SheetHeader>
//     <div className="mt-8 space-y-4 gap-0">
// {
//     cartItems&&cartItems.length>0?cartItems.map(item=><UserCartWrapper cartItems={item}/>):null
// }
//     </div>
//     <div className="mt-8 space-y-4 gap-0">
//         <div className="flex justify-between ">
//             <span className="font-bold">Total</span>
//              <span className="font-bold">${totalCartAmount}</span>
//         </div>
//     </div>
//     <Button  onClick={()=>{
//       navigate('/shop/checkout')
//       setOpenCartSheet(false)
//     }
//   }
      
//       >Checkout</Button>
//   </SheetContent>
// }
// export default UserCartItemsWrapper


//!test

// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
// import { Button } from "../ui/button"
// import UserCartWrapper from "./cart-wrapper"
// import { useNavigate } from "react-router-dom"

// function UserCartItemsWrapper({ cartItems, setOpenCartSheet, open, setOpen }) {
//   const navigate = useNavigate()

//   const totalCartAmount = cartItems && cartItems.length > 0
//     ? cartItems.reduce((sum, currentItem) =>
//         sum + (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price) * currentItem.quantity, 0)
//     : 0;

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>  {/* ✅ Add Sheet wrapper */}
//       <SheetContent className="sm:max-w-md">
//         <SheetHeader>
//           <SheetTitle>Your Cart</SheetTitle>
//         </SheetHeader>
//         <div className="mt-8 space-y-4">
//           {cartItems && cartItems.length > 0
//             ? cartItems.map(item => <UserCartWrapper key={item.productId} cartItems={item} />)
//             : null}
//         </div>
//         <div className="mt-8 space-y-4">
//           <div className="flex justify-between">
//             <span className="font-bold">Total</span>
//             <span className="font-bold">${totalCartAmount}</span>
//           </div>
//         </div>
//         <Button onClick={() => {
//           navigate('/shop/checkout')
//           setOpenCartSheet(false)
//         }}>Checkout</Button>
//       </SheetContent>
//     </Sheet>
//   )
// }

// export default UserCartItemsWrapper


//!test3


import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Button } from "../ui/button"
import UserCartWrapper from "./cart-wrapper"
import { useNavigate } from "react-router-dom"

function UserCartItemsWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate()

  const totalCartAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, currentItem) =>
        sum + (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price) * currentItem.quantity, 0)
    : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map(item => <UserCartWrapper key={item.productId} cartItems={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button onClick={() => {
        navigate('/shop/checkout')
        setOpenCartSheet(false)
      }}>Checkout</Button>
    </SheetContent>
  )
}

export default UserCartItemsWrapper