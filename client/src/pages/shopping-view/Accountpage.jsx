import { Tabs,TabsList,TabsTrigger,TabsContent } from "@/components/ui/tabs"
import accImg from "../../assets/account.jpg"
import Address from "@/components/shopping-view/address"
import ClientOrders from "@/components/shopping-view/orders"
function Accountpage(){
    return <div className="flex flex-col"> 
   <div className="relative h-[300px] w-full overflow-hidden ">
    <img  src={accImg} 
    className="h-full w-full object-cover object-center"
    />
   </div>
   <div className="container mx-auto grid-cols-1 gap-8 py-8">
    <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="order">Orders</TabsTrigger>
             <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="order">
<ClientOrders/>
          </TabsContent>
          <TabsContent value="address">
<Address/>
          </TabsContent>
        </Tabs>
    </div>
   </div>
    </div>
}
export default Accountpage