import { Card,CardHeader,CardTitle,CardContent } from "../ui/card"
import { Table,TableHeader,TableHead,TableCell,TableBody,TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Dialog } from "../ui/dialog"
import { use, useState } from "react"
import AdminOrderDetailsView from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersDetailsforAdmin, getAllOrdersforAdmin ,resetOrderDetails } from "@/store/admin/orderSlice"
import { useEffect } from "react"
import { Badge } from "../ui/badge"
function AdminOrders(){
 const [openDetailsDialog,setopenDetailsDialog]=useState(false)
 const {orderList,orderDetails}=useSelector(state=>state.adminOrderDetails)
 const dispatch=useDispatch();
 useEffect(()=>{
    dispatch(getAllOrdersforAdmin()).then((data)=>console.log(data,'all data to the admin'))
 },[dispatch])



   function handlefetchorderDetails(currentId){
   dispatch(getAllOrdersDetailsforAdmin(currentId))
   }

   useEffect(()=>{
       if(orderDetails!==null) setopenDetailsDialog(true)
   },[orderDetails])

console.log(orderDetails,"orderDetails")

    return <Card>
   <CardHeader>
    <CardTitle className="text-[20px] font-bold">
       All Orders
    </CardTitle>
   </CardHeader>
   <CardContent>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>OrderId</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
               
                 <TableHead className="sr-only">View Details</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                orderList&&orderList.length>0?orderList.map(orderItem=>  <TableRow>
                <TableCell>{orderItem._id}</TableCell>
                                <TableCell>{orderItem.orderDate.split('T')[0]}</TableCell>
                                     <TableCell >
                                        <Badge className={`${orderItem?.orderStatus === 'confirmed' ? 'bg-green-500': orderItem?.orderStatus === 'rejected'?"bg-red-500": 'bg-black'}`}>
                                        {orderItem.orderStatus}
                                        </Badge>
                                        </TableCell>
                                 <TableCell>${orderItem.totalAmount}</TableCell>
                                                  <TableCell>
                                                    <Dialog open={openDetailsDialog} onOpenChange={()=>{setopenDetailsDialog(false) ;dispatch(resetOrderDetails())}}>
                                                    <Button onClick={()=>handlefetchorderDetails(orderItem._id)}>view Details</Button>
                                                    <AdminOrderDetailsView orderDetails={orderDetails}/>
                                                    </Dialog>
                                                  </TableCell>

            </TableRow>):null
            }
          
        </TableBody>
    </Table>
   </CardContent>
</Card>
}
export default AdminOrders


// import { DialogContent, } from "../ui/dialog"
// import { Label } from "../ui/label"
// import { Separator } from "../ui/separator"
// function ShoppingOrderDetailsView({orderDetails}){
// return (
//      <DialogContent className="sm:max-w-[600px] ">
//               <div className="grid gap-6 mt-6" >
//                 <div className="grid gap-2">
//                     <div className="flex items-center justify-between">
//                         <p className="font-medium ">Order Id</p>
//                            <Label></Label>
                           
//                     </div>
//                      <div className="flex items-center justify-between">
//                         <p className="font-medium ">Order Date</p>
//                            <Label>12/1/2/12</Label>
                           
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <p className="font-medium ">Order Status</p>
//                            <Label>inprocess</Label>
                           
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <p className="font-medium ">Order Price</p>
//                            <Label>$500</Label>
                           
//                     </div>
//                 </div>
//                 <Separator/>
//                 <div className="grid gap-4">
//                     <div className="grid gap-2">
//                         <div className="font-medium">Order Details</div>
//                         <ul className="grid gap-3">
//                             <li className="flex items-center justify-between">
//                                 <span>Product One</span>
//                                 <span>$100</span>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                  <div className="grid gap-4">
//                     <div className="grid gap-2">
//                         <div className="font-medium">Shipping Info</div>
//                          <div className="grid gap-0.5 text-muted-foreground">
//                                 <span>kushal</span>
//                                 <span>Address</span>
//                                 <span>city</span>
//                                 <span>pincode</span>
//                                 <span>notes</span>
//                          </div>
//                          </div>
//                  </div>
                
//               </div>
//         </DialogContent>
// )
// }
// export default ShoppingOrderDetailsView




// import { DialogContent, DialogTitle } from "../ui/dialog"
// import { Label } from "../ui/label"
// import { Separator } from "../ui/separator"
// import { Badge } from "../ui/badge"
// import { useSelector } from "react-redux"

// function ShoppingOrderDetailsView({ orderDetails }) {
//     const user= useSelector((state)=>state.auth);
//     console.log(user,"user")
//   return (
//     <DialogContent className="sm:max-w-[600px]">
//       <DialogTitle>Order Details</DialogTitle>
//       <div className="grid gap-6 mt-6">
//         <div className="grid gap-2">
//           <div className="flex items-center justify-between">
//             <p className="font-medium">Order Id</p>
//             <Label>{orderDetails?._id}</Label>
//           </div>
//           <div className="flex items-center justify-between">
//             <p className="font-medium">Order Date</p>
//             <Label>{orderDetails?.orderDate?.split('T')[0]}</Label>
//           </div>
//           <div className="flex items-center justify-between">
//             <p className="font-medium">Order Status</p>
//             <Label>
//               {/* ✅ FIXED: was orderDetails.orderStatus (crashes when null), now using ?. */}
//               <Badge className={`py-1 px-3 ${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-500' : 'bg-black'}`}>
//                 {orderDetails?.orderStatus}
//               </Badge>
//             </Label>
//           </div>

// <div className="flex items-center justify-between">
//             <p className="font-medium">Payment Method</p>
//             <Label>{orderDetails?.paymentMethod}</Label>

//           </div>


//   <div className="flex items-center justify-between">
//             <p className="font-medium">Payment Status</p>
//             <Label>{orderDetails?.paymentStatus}</Label>

//           </div>



//           <div className="flex items-center justify-between">
//             <p className="font-medium">Order Price</p>
//             <Label>${orderDetails?.totalAmount}</Label>
//           </div>
//         </div>

//         <Separator />

//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Order Items</div>
//             <ul className="grid gap-3">
//               {orderDetails?.cartItems && orderDetails.cartItems.length > 0
//                 ? orderDetails.cartItems.map((item) => (
//                     <li key={item.productId} className=" grid grid-cols-3 items-center text-md gap-5 ">
//                       <span>Product: {item.title}</span>
//                          <span>Quantity:{item.quantity}</span>

//                       <span>${item.price}</span>
//                     </li>
//                   ))
//                 : null}
//             </ul>
//           </div>
//         </div>

//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Shipping Info</div>
//             <div className="grid gap-0.5 text-muted-foreground">
//                 <span>{user.user.userName}</span>
//               <span>{orderDetails?.addressInfo?.address}</span>
//               <span>{orderDetails?.addressInfo?.city}</span>
//               <span>{orderDetails?.addressInfo?.pincode}</span>
//               <span>{orderDetails?.addressInfo?.phone}</span>
//               <span>{orderDetails?.addressInfo?.notes}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DialogContent>
//   )
// }

// export default ShoppingOrderDetailsView