import mongoose from "mongoose";

const AlbumsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [{type: String, required: true}],
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    albumTime: { type: Number, required: true },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
});

export const AlbumsModel = mongoose.model("albums", AlbumsSchema)
