import mongoose from "mongoose";

export interface IHotel {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number,
  ratings: number;
  imageUrls: string[];
  lastUpdated: Date;
}

const hotelSchema = new mongoose.Schema<IHotel>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, default: 0 },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    ratings: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
  }
);

export const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);
