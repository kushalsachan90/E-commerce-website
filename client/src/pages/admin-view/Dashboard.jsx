import { useState } from "react";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
function AdminDashboard(){
    const [imageFile,setImageFile]=useState(null);
    const[uploadedImageUrl,setUploadedImageUrl]=useState('');
    const [imageLoadingState,setImageLoadingState]=useState(false)
    console.log(uploadedImageUrl,"uploadedImageUrl")
    return (
        <div>
            <h1>Upload Feature Images</h1>  
             <ProductImageUpload isCustomStyling={true} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
            //  isEditMode={currentEditedid!==null}
             />
          <Button>Upload</Button>
        </div>
    )
}
export default AdminDashboard;