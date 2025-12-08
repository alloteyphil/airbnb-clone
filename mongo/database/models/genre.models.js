import { Schema, model, models } from "mongoose";

const GenreSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const Genre = models.Genre || model("Genre", GenreSchema);

export default Genre;

