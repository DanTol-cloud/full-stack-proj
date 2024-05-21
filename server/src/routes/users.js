import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../modals/Users.js";
import nodemailer from "nodemailer";

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
        return res.json({ message: "User already exist!" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({ username, email, password, admin: false });
    await newUser.save()


    res.json({ message: "User Registered Successfully!" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });


    if (!user) {
        return res.json({ message: "User does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is incorrect!!" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
});

router.get("/users/:userID", async (req, res) => {
    try {
        const result = await UserModel.findById(req.params.userID);
        res.json(result)
    } catch (err) {
        console.error(err)
    }
})

router.post('/forgot-password', async (req, res) => {
    const {email} = req.body;

    const user = await UserModel.findOne({ email });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danielkozac05@gmail.com',
            pass: 'ekqe htkw zztu gbsm',
        },
    });

    const mailOptions = {
        from: 'danielkozac05@gmail.com',
        to: email,
        subject: 'Забутий пароль',
        text: `Ваш пароль: ${user.password}`, // Замініть your_password на реальний пароль користувача
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Помилка відправлення листа');
        } else {
            console.log('Email відправлено: ' + info.response);
            res.send('Лист з паролем відправлено');
        }
    });
})


export {router as userRouter};
