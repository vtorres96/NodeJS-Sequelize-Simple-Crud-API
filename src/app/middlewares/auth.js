const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: "Nenhum token fornecido" });
    }

    const parts = authHeader.split(" ");

    if(!parts.length === 2){
        return res.status(401).send({ error: "Falha ao processar requisição" });
    }

    const [scheme, token] = parts;

    if(!/Bearer/i.test(scheme)){
        return res.status(401).send({ error: "Token mal formatado" });
    }

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        
        if(error){
            return res.status(400).send({ error: "Token inválido" });
        }

        console.log(decoded)
        req.userId = decoded.id;
        return next();
    });
};