import { useFormContext } from "react-hook-form"
import {HotelFormType} from './AddHotelForm'
function UploadImage() {
    const {register, formState: {errors}} = useFormContext<HotelFormType>();
  return (
    <div>
        <h3 className="text 2xl font-semibold mb-3 text-gray-700">Images</h3>
        <div className="border rounded p-3 flex flex-col gap-3">
            <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal"
             {...register("imageFiles",{
                validate: (imageFiles)=>{
                    const totalLength = imageFiles.length;
                    if(totalLength === 0) {
                        return 'Please  upload at least one file';
                    }if(totalLength > 5){
                        return `Only up to 5 files can be uploaded`;    
                    }
                    return true;
                },
            })}/>
        </div>
        {errors.imageFiles && (<span className="text-red-500 font-normal">{errors.imageFiles.message}</span>)}
    </div>
  )
}

export default UploadImage