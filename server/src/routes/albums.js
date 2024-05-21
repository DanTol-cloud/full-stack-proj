import express from "express";
import mongoose from "mongoose";
import { AlbumsModel } from "../modals/Albums.js";
import { UserModel } from "../modals/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await AlbumsModel.find({});
        res.json(result)
    } catch (err) {
        res.json(err)
    }
});

router.post("/", async (req, res) => {
    const album = new AlbumsModel(req.body);
    try {
        await album.save()
        res.json(album);
    } catch (err) {
        res.json(err)
    }
});

router.put("/", async (req, res) => {
    try {
        const album = await AlbumsModel.findById(req.body.albumID);
        const user = await UserModel.findById(req.body.userID);
        user.savedAlbums.push(album);
        await user.save();
        res.json({ savedAlbums: user.savedAlbums });
    } catch (err) {
        res.json(err)
    }
});

router.get("/savedAlbums/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedAlbums: user?.savedAlbums });
    } catch (err) {
        res.json(err)
    }
});

router.get("/savedAlbums/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedAlbums = await AlbumsModel.find({
            _id: { $in: user.savedAlbums },
        });
        res.json({ savedAlbums })
    } catch (err) {
        res.json(err)
    }
});

export { router as albumRouter };
