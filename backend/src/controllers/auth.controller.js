const User = require('../models/User.model.js');
const { hashValue, verifyHash } = require('../utils/hash.js');
const { genrateRefreshToken, generateToken, decodeToken } = require('../utils/managementToken')


const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password)
        return res.status(400).json({message: 'Le nom, email et le mot de passe est require'})
    
    //Verification de l'existance de l'utilisateur dans la base de donné
    const exist = await User.findOne( {email} )
    console.log(exist);
    
    if(exist) return res.status(400).json({message:'Cet utilisateur existe déjà'})

    //Hacher le mot de passe 
    const hashPassword = await hashValue(password)

    // Creer un nouvel utilisateur
    const created = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
        message: 'Utilisateur créé avec succès',
        user: {
            _id: created._id,
            name: created.name,
            email: created.email,
            role: created.role
        }
    })
}

const options = {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 3 * 60 * 1000
}
let refreshTKDB = [];
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email:email});

    if(!user)
        return res.status(401).json({message: 'Ede passe incorrect'});

    const isPasswordValid = await verifyHash(user.password, password)
    if(!isPasswordValid){
        return res.status(400).json({msg: 'passe incorrect'})
    }
    //On genere le token et le stock dans les cookies 
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = generateToken(payload)
    const refreshToken = genrateRefreshToken(payload)

    res.cookie('token', token, options)
    res.cookie('refreshToken', refreshToken, {
        ...options,
        maxAge: 15 * 60 * 1000,
    })

    refreshTKDB.push(refreshToken);
    res.status(200).json({
        message: "Connexion réussir ",
        token,
        refreshToken,
    })
}
const logout = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    if (refreshToken) {
        refreshTKDB = refreshTKDB.filter((t) => t !== refreshToken);
    }
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Déconnexion réussie !' });
}
 
const refresh = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) return res.status(401).json({ message: 'RefreshToken manquant' });
    if (!refreshTKDB.includes(refreshToken)) return res.status(401).json({ message: 'RefreshToken invalid' });

    try {
        const payload = decodeToken(refreshToken, process.env.REFRESH_TOKEN_KEY);
        const newPayload = { id: payload.id, email: payload.email, role: payload.role };
        const newToken = generateToken(newPayload);
        // rotate refresh token
        const newRefresh = genrateRefreshToken(newPayload);
        // replace in memory DB
        refreshTKDB = refreshTKDB.filter((t) => t !== refreshToken);
        refreshTKDB.push(newRefresh);
        // set cookies
        res.cookie('token', newToken, options);
        res.cookie('refreshToken', newRefresh, { ...options, maxAge: 15 * 60 * 1000 });
        res.status(200).json({ message: 'Token rafraîchi', token: newToken, refreshToken: newRefresh });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Token invalid' });
        if (error.name === 'TokenExpiredError' || error.name === 'TokenExpireError') return res.status(401).json({ message: 'Token expiré' });
        return res.status(500).json({ message: "Une erreur inattendue" });
    }
}


module.exports = { register, login, logout, refresh};
