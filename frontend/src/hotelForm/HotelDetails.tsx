import { useFormContext } from "react-hook-form"
import { HotelFormType } from "./AddHotelForm";

function HotelDetails() {

  const {register, formState: {errors}} = useFormContext<HotelFormType>();

  return (
    <div className="flex flex-col gap-3">

      <h2 className="text-2xl mb-3 font-semibold text-gray-700">Add Hotel</h2>
      
      <label htmlFor="" className="text-gray-600 font-bold">
          Name
          <input type="text" className="border rounded w-full py-1 px-2 font-normal"
            {...register("name",{required: "Please enter Hotel name"})}
            autoComplete="off"
          />
          {errors.name && (<span className="text-red-500 font-normal">{errors.name.message}</span>)}
      </label>

      <div className="md:flex gap-3">
        <label htmlFor="" className="text-gray-600 font-bold flex-1">
            City
            <input type="text" className="border rounded w-full py-1 px-2 font-normal"
              {...register("city",{required: "This is Required"})}
              autoComplete="off"
            />
            {errors.city && (<span className="text-red-500 font-normal">{errors.city.message}</span>)}
        </label>
        <label htmlFor="" className="text-gray-600 font-bold flex-1">
          Country
          <input type="text" className="border rounded w-full py-1 px-2 font-normal"
            {...register("country",{required: "This is Required"})}
            autoComplete="off"
          />
          {errors.country && (<span className="text-red-500 font-normal">{errors.country.message}</span>)}
        </label>
      </div>

      <label htmlFor="" className="text-gray-600 font-bold">
          Description
          <textarea rows={6}  className="resize-none border rounded w-full py-1 px-2 font-normal"
            {...register("description",{required: "This is Required"})}
            autoComplete="off"
          ></textarea>
          {errors.description && (<span className="text-red-500 font-normal">{errors.description.message}</span>)}
      </label>

      <label htmlFor="" className="text-gray-600 font-bold max-w-[50%]">
          Price Per Night
          <input type="number" min={1} className="border rounded w-full py-1 px-2 font-normal"
            {...register("pricePerNight",{required: "This is Required"})}
            autoComplete="off"
          />
          {errors.pricePerNight && (<span className="text-red-500 font-normal">{errors.pricePerNight.message}</span>)}
      </label>

      <label htmlFor="" className="text-gray-600 font-bold max-w-[50%]">
          Ratings
          <select {...register("ratings", {required: "This is required"})} className="border rounded w-full px-2 py-1 text-gray-600 font-normal">
            <option value="" className="text-sm" hidden>Select Ratings</option>
            {
              [1,2,3,4,5].map((num, i)=>(
                <option value={num} key={i}>{num}</option>
              ))
            }
          </select>
          {errors.ratings && (<span className="text-red-500 font-normal">{errors.ratings.message}</span>)}
      </label>

    </div>
  )
}

export default HotelDetails