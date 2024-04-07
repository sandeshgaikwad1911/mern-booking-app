import {FormProvider, useForm } from "react-hook-form";
import HotelDetails from "./HotelDetails";
import HotelTypes from "./HotelTypes";
import HotelFacilities from "./HotelFacilities";
import GuestSection from "./GuestSection";
import UploadImage from "./UploadImage";

export type HotelFormType = {
  name: string,
  city: string,
  country: string,
  description: string,
  type: string,
  pricePerNight: number,
  ratings: number,
  facilities: string[],
  imageFiles: FileList,
  adultCount: number,
  childCount: number
}

const AddHotelForm = () => {

  const formMethods = useForm<HotelFormType>();
  const { handleSubmit } = formMethods;

  const submitHandler = handleSubmit((formData: HotelFormType) => {
    console.log("hotelFormData", formData);
  })
  return (
    <FormProvider  {...formMethods}>
      <form className="flex flex-col gap-6" onSubmit={submitHandler} >
          <HotelDetails/>
          <HotelTypes/>
          <HotelFacilities/>
          <GuestSection/>
          <UploadImage/>
          <span>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded'>Save</button>
          </span>
      </form>
    </FormProvider>
  )
}

export default AddHotelForm