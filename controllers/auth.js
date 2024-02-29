require('dotenv').config;
const passport = require("passport");
const { ServerResponse } = require('http');
const jwt = require('jsonwebtoken');
const { User, Provider, UserToken } = require('../models/index');

module.exports = {
    google: (req, res) => {
        const empty = new ServerResponse(req);

        passport.authenticate(
            'google', 
            { scope: ['profile', 'email'], session: false },
            (err, user, info) => {
                console.log(err, user, info);
            }
        )(req, empty);

        const url = empty.getHeader('location');

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Lấy link redirect",
            result: {
                urlRedirect: url,
            }
        })
    },

    googleCallback: async (req, res) => {
        try {
            const data = req.user;

            const [user] = await User.findOrCreate(
                {
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        name: data.name,
                        thumbnail: data.thumbnail,
                    }
                },
            );

            const [provider] = await Provider.findOrCreate({
                where: {
                    user_id: user.id,
                    provider: "google",
                },
                defaults: {
                    user_id: user.id,
                    provider: "google",
                }
            });

            const token = jwt.sign({ ...data, id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXP
            });
            const refreshToken = jwt.sign({ aaa: "aaa" }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXP
            });

            await UserToken.create({
                user_id: user.id,
                refresh_token: refreshToken, 
            });

            return res.status(200).json({
                accessToken: token,
                refreshToken,
            });
        } catch(e) {
            console.log(e);
        }
    },
}