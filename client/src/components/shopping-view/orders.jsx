
import {Card,CardHeader,CardTitle,CardContent} from "../ui/card"
import { Table, TableHeader,TableRow,TableHead,TableBody,TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "@/store/order-slice";
function ClientOrders(){
    const [openDetailsDialog,setopenDetailsDialog]=useState(false)

    const dispatch=useDispatch()

    const {user}=useSelector(state=>state.auth);
    const {orderList}=useSelector(state=>state.Orderdetails)
    useEffect(() => {
  if (user?.id) {
    dispatch(getAllOrdersByUser(user.id)).then((data)=>{
        console.log(data,'data')
    })
  }
}, [dispatch, user])
    console.log(orderList,"orderList")
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
                                     <TableCell>{orderItem.orderStatus}</TableCell>
                                 <TableCell>${orderItem.totalAmount}</TableCell>
                                                  <TableCell>
                                                    <Dialog open={openDetailsDialog} onOpenChange={setopenDetailsDialog}>
                                                    <Button onClick={()=>setopenDetailsDialog(true)}>view Details</Button>
                                                    <ShoppingOrderDetailsView/>
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