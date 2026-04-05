
import {Card,CardHeader,CardTitle,CardContent} from "../ui/card"
import { Table, TableHeader,TableRow,TableHead,TableBody,TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getAllOrdersDetails, resetOrderDetails } from "@/store/order-slice";
import { Badge } from "../ui/badge";
function ClientOrders(){
  
    

    const [openDetailsDialog,setopenDetailsDialog]=useState(false)

    const dispatch=useDispatch()

    const {user}=useSelector(state=>state.auth);
    const {orderList,orderDetails}=useSelector(state=>state.Orderdetails)
     console.log(orderDetails,"OrderDetails")
    function handlefetchorderDetails(getId){
           dispatch(getAllOrdersDetails(getId))
    }

  

    useEffect(() => {
  if (user?.id) {
    dispatch(getAllOrdersByUser(user.id)).then((data)=>{
        console.log(data,'data')
    })
  }
}, [dispatch, user])

useEffect(()=>{
    if(orderDetails!==null) setopenDetailsDialog(true)
},[orderDetails]);
   
return  <Card>
   <CardHeader>
    <CardTitle className="text-[20px] font-bold">
        Order History
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
                 <TableHead className="sr-only">Details</TableHead>
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
                                                    <ShoppingOrderDetailsView orderDetails={orderDetails}/>
                                                    </Dialog>
                                                  </TableCell>

            </TableRow>):null
            }
          
        </TableBody>
    </Table>
   </CardContent>
</Card>
}
export default ClientOrders;

