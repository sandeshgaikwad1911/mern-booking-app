import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./AddHotelForm";

function GuestSection() {
    const { register, formState: {errors} } = useFormContext<HotelFormType>();
  return (
    <div>
        <h3 className="text 2xl font-semibold mb-3 text-gray-700">Guests</h3>
        <div className="grid grid-cols-2 p-6 gap-4 bg-gray-300">
            <label htmlFor="" className="text-gray-700 text-sm font-semibold">
                Adults
                <input type="number" min={1} className="border rounded w-full py-2 px-3 font-normal"
                    {...register("adultCount", {required: "This field is required."})}
                />
                {errors.adultCount && (<span className="text-red-500 font-normal">{errors.adultCount?.message}</span>)}         
            </label>
            
            <label htmlFor="" className="text-gray-700 text-sm font-semibold">
                Childs
                <input type="number" min={0} className="border rounded w-full py-2 px-3 font-normal"
                    {...register("childCount")}
                />
            </label>
        </div>
        
    </div>
  )
}

export default GuestSection;