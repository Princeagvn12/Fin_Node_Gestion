const jwt = require('jsonwebtoken')


const verifyTokenMiddleware = (req, res, next) => {
  // 1. Récupérer le token depuis les cookies
  const token = req.cookies.token

  // 2. Vérifier que le token existe
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé : token manquant' })
  }

  try {
    // 3. Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

    // 4. Attacher les infos du user à la requête
    req.user = decoded
    // console.log(req.user);
    

    // 5. Passer au prochain middleware ou route
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré' })
  }
}

module.exports = verifyTokenMiddleware