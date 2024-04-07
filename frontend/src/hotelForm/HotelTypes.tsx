import { useFormContext } from "react-hook-form"
import { hotelTypes } from "../configs/hotel-type-config"
import { HotelFormType } from "./AddHotelForm";

const HotelTypes = () => {

    const { register, watch, formState: {errors} } = useFormContext<HotelFormType>();

    const typeWatch = watch('type');
    console.log('typeWatch',typeWatch)

  return (
    <div>
        <h3 className="text 2xl font-semibold mb-3 text-gray-700">Type</h3>
        <div className="grid gap-2 grid-cols-2  sm:grid-cols-3 md:grid-cols-5">
            {
                hotelTypes.map((type, i)=>(
                    <label key={i} className={ typeWatch === type
                        ? "cursor-pointer bg-blue-600 text-white text-sm rounded-full px-4 py-2 font-semibold " 
                        : "cursor-pointer bg-gray-200 text-sm rounded-full px-4 py-2 font-semibold hover:bg-blue-600 hover:text-white"}>
                        <input type="radio" value={type} {...register("type",{required: "This is required."})} className="hidden"/>
                        <span className="flex items-center justify-center">{type}</span>
                    </label>
                ))
            }
        </div>
        {errors.type && (<span className="text-red-500 font-normal">{errors.type.message}</span>)}
    </div>
  )
}

export default HotelTypes