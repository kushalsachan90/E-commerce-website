
import {Card,CardHeader,CardTitle,CardContent} from "../ui/card"
import { Table, TableHeader,TableRow,TableHead,TableBody,TableCell } from "../ui/table";
import { Button } from "../ui/button";
function ClientOrders(){
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
                                 <TableCell>100</TableCell>
                                                  <TableCell>
                                                    <Button>view Details</Button>
                                                  </TableCell>

            </TableRow>
        </TableBody>
    </Table>
   </CardContent>
</Card>
}
export default ClientOrders;