const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({ message: "Acesso negado" })

        const verifiedToken = jwt.verify(token, process.env.SECRET)

        req.connectedUser = verifiedToken

        next()

    } catch (err) {
        return res.status(403).json({ error: "Token inválido" })
    }
}

module.exports = validateToken
