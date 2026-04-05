import { useRef } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input";
import { UploadCloudIcon, XIcon,File} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
function ProductImageUpload({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl,setImageLoadingState,imageLoadingState,isEditMode,isCustomStyling=false}){
    const inputRef=useRef(null);
 console.log(isEditMode,'isEditMode');
    function handleImageFileChange(event){
       console.log(event.target.files)
       const selectedFiles=event.target.files?.[0]
       console.log(selectedFiles,"this is the selected file");
      if (selectedFiles) setImageFile(selectedFiles)

    }

    function handleDragOver(event){
        
event.preventDefault()
console.log(event.dataTransfer.files,"this is from the handledragand drop")
    }
    function handleDrop(event){
  event.preventDefault()
  console.log(event.dataTransfer.files,"this is from the handle drop")

  const droppedFile=event.dataTransfer.files?.[0];
  if(droppedFile) setImageFile(droppedFile)
    }
function handleRemoveImage(){
    setImageFile(null)
    if(inputRef.current){
        inputRef.current.value='';
    }
}

async function uploadImageToCloudinary(){
    setImageLoadingState(true)
    const data=new FormData();
    data.append('my_file',imageFile)
    const response=await axios.post('http://localhost:5000/api/admin/products/upload-image',data);
    console.log(response,"here is the data getting from the backened")
    if(response.data.success) 
    {
        setUploadedImageUrl(response.data.result.url)
        setImageLoadingState(false)
    }
}
useEffect(()=>{
    if(imageFile!==null) uploadImageToCloudinary()
},[imageFile])

    return (
        <div className="w-full max-w-md mx-auto">
            <Label className={`text-lg font-semibold mb-2 block ml-2 w-full ${isCustomStyling?'':"max-w-md mx-auto"}`}>
                Upload Image
            </Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg  p-4">
                <Input id="Image-upload" type="file"className="hidden" ref={inputRef} onChange={handleImageFileChange}disabled={ isEditMode}/>
                {
                    !imageFile?
                    <Label htmlFor="Image-upload" className={`${isEditMode?"cursor-not-allowed":""}flex flex-col items-center justify-center h-32 cursor-pointer`}>
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span>Drag & drop or click to upload image</span>

                    </Label>: imageLoadingState?<Skeleton className="h-10 bg-gray-100"/>:<div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <File className="w-8 text-primary mr-2 h-8" />
                            <p className="text-sm font-medium">{imageFile.name}</p>
                        </div>
                        
                        <button size="icon" className="text-muted-foreground hover:text-foreground "onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
export default ProductImageUpload