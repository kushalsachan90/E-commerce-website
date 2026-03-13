import { Fragment } from "react";
import { filterOptions } from "../config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({filters,handleFilter}){
return (
    <div className="bg-background rounded-lg w-60  shadow-sm">
        <div className="p-4 border-b">
            <h2 className="text-lg font-extrabold">Filter</h2>
        </div>
         <div className="p-4 space-y-4 ">
       {
        Object.keys(filterOptions).map(keyItem=><Fragment>
            <div>
                <h3 className="text-base font-bold">
                    {keyItem}
                </h3>
                <div className="grid gap-2 mt-2">
                    {
                   filterOptions[keyItem].map(items=><Label className="flex font-medium items-center gap-2">
 <Checkbox
checked={
  filters &&
  Object.keys(filters).length > 0 &&
  filters[keyItem] &&
  filters[keyItem].indexOf(items.id) > -1
}
 
 onCheckedChange={()=>handleFilter(keyItem,items.id)} className="border-black shadow-2xs" />
 {items.label}
                   </Label>)
                    }
                </div>
            </div>
            <Separator />
        </Fragment>)
       }
      </div>
     
    </div>
    
)
}

export default ProductFilter;