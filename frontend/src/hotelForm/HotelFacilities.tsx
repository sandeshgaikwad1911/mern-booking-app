import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../configs/hotel-type-config";
import {HotelFormType} from './AddHotelForm';


function HotelFacilities() {
    const { register, formState: {errors}} = useFormContext<HotelFormType>()
  return (
    <div>
        <h3 className="text 2xl font-semibold mb-3 text-gray-700">Facilities</h3>
        <div className="grid gap-2 grid-cols-2  sm:grid-cols-3 md:grid-cols-5">
            {
                hotelFacilities.map((facility, i)=>(
                    <label key={i} className="flex gap-1">
                        <input type="checkbox" value={facility} 
                            {...register("facilities", { validate: (facilities)=>{
                                if(facilities && facilities.length > 0){
                                    return true
                                }
                                else{
                                    return "Select one of the facility"
                                }
                            }})}
                        />
                        {facility}
                    </label>
                ))
            }
        </div>
        {errors.facilities && (<span className="text-red-500 font-normal">{errors.facilities.message}</span>)}
    </div>
  )
}

export default HotelFacilities