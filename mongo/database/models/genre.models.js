import { Schema, model, models } from "mongoose";

const GenreSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
});

const Genre = models.Genre || model("Genre", GenreSchema);

export default Genre;
