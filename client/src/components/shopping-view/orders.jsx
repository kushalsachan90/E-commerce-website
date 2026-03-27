
import {Card,CardHeader,CardTitle,CardContent} from "../ui/card"
import { Table, TableHeader,TableRow,TableHead,TableBody,TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useState } from "react";
function ClientOrders(){
    const [openDetailsDialog,setopenDetailsDialog]=useState(false)
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
            <TableRow>
                <TableCell>114314</TableCell>
                                <TableCell>12/12/12</TableCell>
                                     <TableCell>inprocess</TableCell>
                                 <TableCell>$100</TableCell>
                                                  <TableCell>
                                                    <Dialog open={openDetailsDialog} onOpenChange={setopenDetailsDialog}>
                                                    <Button onClick={()=>setopenDetailsDialog(true)}>view Details</Button>
                                                    <ShoppingOrderDetailsView/>
                                                    </Dialog>
                                                  </TableCell>

            </TableRow>
        </TableBody>
    </Table>
   </CardContent>
</Card>
}
export default ClientOrders;