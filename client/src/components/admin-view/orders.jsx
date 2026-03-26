import { Card,CardHeader,CardTitle,CardContent } from "../ui/card"
import { Table,TableHeader,TableHead,TableCell,TableBody,TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Dialog } from "../ui/dialog"
import { useState } from "react"
import AdminOrderDetailsView from "./order-details"
function AdminOrders(){
 const [openDetailsDialog,setopenDetailsDialog]=useState(false)

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
            <TableRow>
                <TableCell>114314</TableCell>
                                <TableCell>12/12/12</TableCell>
                                     <TableCell>inprocess</TableCell>
                                 <TableCell>100</TableCell>
                                                  <TableCell>
                                                     <Dialog open={openDetailsDialog} onOpenChange={setopenDetailsDialog}>
                                                    <Button onClick={()=>setopenDetailsDialog(true)}>view Details</Button>
                                                    <AdminOrderDetailsView/>
                                                    </Dialog>
                                                  </TableCell>

            </TableRow>
        </TableBody>
    </Table>
   </CardContent>
</Card>
}
export default AdminOrders