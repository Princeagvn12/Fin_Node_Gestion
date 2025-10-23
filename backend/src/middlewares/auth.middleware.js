function authMiddleware(req, res, next) {
    const authHeader = req.herders['authorization'];
    console.log(authHeader);
    
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: 'Access token is missing'})
    }
}

module.exports =  authMiddleware;
