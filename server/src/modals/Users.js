import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    admin: {type: Boolean, require: true},
    savedAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "albums"}]
});

export const UserModel = mongoose.model("users", UserSchema)
