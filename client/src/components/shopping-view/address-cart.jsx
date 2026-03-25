
import {Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

function AddressCart({addressInfo}){
    return (
        <Card>
            <CardContent className="grid gap-4">
                <Label>Address: {addressInfo.address}</Label>
                <Label>City: {addressInfo.city}</Label>
                <Label>pincode: {addressInfo.pincode}</Label>
                <Label>phone: {addressInfo.phone}</Label>
                <Label>notes: {addressInfo.notes}</Label>

            </CardContent>
        </Card>
    )
}
export default AddressCart