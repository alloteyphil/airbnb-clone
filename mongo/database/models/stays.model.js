import { Schema, model, models } from "mongoose";

const StaysSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, required: true, ref: "Genre" },
  location: { type: String, required: true },
  amenities: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  ratings: { type: Number, required: true },
  host: { type: String, required: true },
  hostImage: { type: [String], required: true },
  description: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  guestFavourite: { type: Boolean },
});

const Stays = models.Stays || model("Stays", StaysSchema);

export default Stays;

