import {Label} from "../ui/label"
import {Input} from "../ui/input"
import {Select, SelectItem } from "../ui/select"
import {Textarea} from "../ui/textarea"
import { SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"

function Form({ formControls,formData,setFormData ,onSubmit,buttonText,isBtndisabled }) {

    function renderInputByComponentType(getcontrolItem) {
        let element = null;
        const value=formData[getcontrolItem.name]||'';
        switch (getcontrolItem.componentType) {
            case 'input':
                element = (
                    <Input
                        name={getcontrolItem.name}
                        placeholder={getcontrolItem.placeholder}
                        id={getcontrolItem.name}
                        type={getcontrolItem.type}
                        value={value}
                        onChange={event=>setFormData({...formData,[getcontrolItem.name]:event.target.value})}
                    />
                );
                break;

            case 'select':
                element = (
                    <Select value={value} onValueChange={(value) => setFormData({...formData,[getcontrolItem.name]:value})}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getcontrolItem.label}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getcontrolItem.options && getcontrolItem.options.length > 0
                                    ? getcontrolItem.options.map(optionItem => (
                                        <SelectItem
                                            key={optionItem.id}
                                            value={optionItem.id}
                                        >
                                            {optionItem.label}
                                        </SelectItem>
                                    ))
                                    : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;

            case 'textarea':
                element = (
                    <Textarea
                        name={getcontrolItem.name}
                        placeholder={getcontrolItem.placeholder}
                        id={getcontrolItem.name}
                       value={value}
                        onChange={event=>setFormData({...formData,[getcontrolItem.name]:event.target.value})}
                    />
                );
                break;

            default:
                element = (
                
                    <Input
                        name={getcontrolItem.name}
                        placeholder={getcontrolItem.placeholder}
                        id={getcontrolItem.name}
                        type={getcontrolItem.type}
                        value={value}
                        onChange={event=>setFormData({...formData,[getcontrolItem.name]:event.target.value})}
                    />

                    
                );
                break;
        }

        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map((controlItem) => (
                        <div
                            className="grid w-full gap-1.5"
                            key={controlItem.name}
                        >
                            <Label
                        
                                className="mb-1"
                            >
                                {controlItem.label}
                            </Label>

                            {renderInputByComponentType(controlItem)}
                        </div>
                    ))
                }
            </div>
           <Button disabled={isBtndisabled} type="submit" className="mt-2 w-full">{buttonText||'submit'}</Button>
        </form>
    )
}

export default Form;
