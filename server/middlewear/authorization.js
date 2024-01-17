const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const jwtToken = req.header("token");

    console.log(jwtToken);

        if (!jwtToken) {
            return res.status(403).json({ message: `Unauthorized.` })
        }
    
        try {

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

        //if token has been created with the JWT_SECRET, decode the payload of the jwt

        req.user = payload.user;

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({ message: `Unauthorized.` });
    }
}

module.exports = auth;