import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Form from "@/components/common/form";
import { addProductFormElements } from "@/components/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useEffect } from "react";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/product-tile";
import{
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct,addNewProduct, editProduct, deleteProduct } from "@/store/admin/ProductSlice";

const initialFormData={
    image:null,
    title:"",
    description:"",
    category:"",
    brand:"",
    price:"",
    salePrice:"",
    totalStock:""
}
function AdminProduct(){
const [opencreateProductDialog,setopencreateProductDialog]=useState(false);
const [formData,setFormData]=useState(initialFormData);
const [currentEditedid,setcurrentEditedid]=useState(null);
// console.log(currentEditedid,'currentEditedid');
const [imageFile,setImageFile]=useState(null);
const[uploadedImageUrl,setUploadedImageUrl]=useState('');
const [imageLoadingState,setImageLoadingState]=useState(false)
const dispatch=useDispatch();
const {productList}=useSelector(state=>state.adminProducts)

function handleDelete(getcurrentProductId){
 console.log(getcurrentProductId,"deleteelementid");
 dispatch(deleteProduct(getcurrentProductId)).then(data=>{
    if(data.payload.success){
        dispatch(fetchAllProduct())
    }
 })
}

function isFormValid(){
    return Object.keys(formData)
    .map((key)=>formData[key]!=="").every((item)=>item)
}

function onSubmit(event){
event.preventDefault();
currentEditedid!==null?dispatch(editProduct({
    id:currentEditedid,
    ...formData

})).then((data)=>{
    console.log(data,'edited');
    if(data.payload.success){
        dispatch(fetchAllProduct())
            setopencreateProductDialog(false)
    }
}):
dispatch(addNewProduct({
...formData,
image:uploadedImageUrl
})).then((data)=>{console.log(data,"image uploaded data")
if(data?.payload?.success){
    dispatch(fetchAllProduct())
    setopencreateProductDialog(false)
    setImageFile(null)
    setFormData(initialFormData)
    toast("product added successfully")
                                                    
}

});

 
} 

useEffect(()=>{
    console.log("AdminProduct mounted")
    dispatch(fetchAllProduct())
},[dispatch]);

 
console.log(formData,"formData all the elment")

    return <Fragment>
        <div className="mb-5 w-full flex justify-end ">
            <Button onClick={()=>setopencreateProductDialog(true) }>Add new Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
                {
                   productList&& productList.length>0?productList.map(productItem=><AdminProductTile setFormData={setFormData}  setcurrentEditedid={setcurrentEditedid} setopencreateProductDialog={setopencreateProductDialog}    key={productItem._id}  product={productItem} handleDelete={handleDelete}/>) :null
                }
            </div>
            <Sheet open={opencreateProductDialog} onOpenChange={(open)=>{setopencreateProductDialog(open) 
            if(!open){
                setcurrentEditedid(null)
                setFormData(initialFormData)
            }
            }}>
              <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle className="pt-4">
                        Add New Product
                    </SheetTitle>
                </SheetHeader>
               <ProductImageUpload imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} isEditMode={currentEditedid!==null} />
                <div className="py-4 mr-5 ml-5">
                    <Form  formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={currentEditedid!==null?'Edit':'Add'} onSubmit={onSubmit} isBtndisabled={!isFormValid()} />
                </div>
              </SheetContent>
            </Sheet>
    </Fragment>
}
export default AdminProduct;