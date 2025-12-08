import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema({
  stripeId: { type: String, required: true },
  user: {
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  stay: {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
  },
  nights: { type: Number, required: true },
  image: { type: String, required: true },
  startDate: { type: String, required: true },
  startDateConverted: { type: Date, required: true },
  endDate: { type: String, required: true },
  endDateConverted: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bookings = models.Bookings || model("Bookings", BookingSchema);

export default Bookings;

