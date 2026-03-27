
import {Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
function AddressCart({addressInfo,handledeleteAddress,handleEditAddress,setCurrentSelectedAddress}){
    return (
        <Card onClick={setCurrentSelectedAddress?()=>setCurrentSelectedAddress(addressInfo):null}>
            <CardContent className="grid gap-4">
                <Label>Address: {addressInfo.address}</Label>
                <Label>City: {addressInfo.city}</Label>
                <Label>pincode: {addressInfo.pincode}</Label>
                <Label>phone: {addressInfo.phone}</Label>
                <Label>notes: {addressInfo.notes}</Label>

            </CardContent>
            <CardFooter className="gap-4">
                <Button onClick={()=>handleEditAddress((addressInfo))}> Edit </Button>
                    
                
                <Button onClick={()=>handledeleteAddress((addressInfo))}>Delete</Button>
            </CardFooter>
        </Card>
    )
}
export default AddressCart