const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.get('Authorization');

        if (!accessToken) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Unauthorized",
            });
        }

        const token = accessToken.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            if (!decoded) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Unauthorized",
                });
            }

            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Unauthorized",
                });
            }

            req.userId = decoded.id;
            next();
        } catch(error) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Unauthorized",
            });
        }
    }
    catch(error) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Unauthorized",
        });
    }
}