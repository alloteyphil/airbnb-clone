import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema({
  stripeId: { type: String, required: true },
  userId: { type: String, required: true },
  stayId: { type: String, required: true },
  title: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  image: { type: String, required: true },
  nights: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bookings = models.Bookings || model("Bookings", BookingSchema);

export default Bookings;
