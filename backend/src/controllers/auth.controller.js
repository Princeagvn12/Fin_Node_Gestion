const User = require('../models/User.model.js');
const { hashValue, verifyHash } = require('../utils/hash.js');
const { genrateRefreshToken, generateToken, decodeToken } = require('../utils/managementToken')


const register = async (req, res) => {
    const { name, email, password , role, statut} = req.body;

    if(!name || !email || !password)
        return res.status(400).json({message: 'Le nom, email et le mot de passe est require'})
    
    //Verification de l'existance de l'utilisateur dans la base de donné
    const exist = await User.findOne( {email} )
    console.log(exist);
    
    if(exist) return res.status(400).json({message:'Cet utilisateur existe déjà'})

    //Hacher le mot de passe 
    const hashPassword = await hashValue(password)

    //Creer un nouvel utilisateur 
    const newUser = {
        name,
        email,
        password: hashPassword,
        role : role || 'Etudiant',
        statut : statut || 'Actif'
    }
    await User.create(newUser)
    res.status(201).json({
        message: 'Utilisateur créé avec succès',
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role:newUser.role || 'Etudiant',
            statut : newUser.statut || 'Inactif'
        }
    })
}

const options = {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 50 * 60 * 1000
}
let refreshTKDB = [];
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email:email});
    if(!user)return res.status(401).json({message: 'Ede passe incorrect'});
    if(user.statut !== 'Actif') return res.status(403).json({message : "Compte Inactif"})

    const isPasswordValid = await verifyHash(user.password, password)
    if(!isPasswordValid){
        return res.status(400).json({msg: 'passe incorrect'})
    }
    //On genere le token et le stock dans les cookies 
    const payload = {
        id: user._id,
        email: user.email,
        name : user.name,
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
    const refreshToken = req.cookies["refresh"];
    refreshTKDB = refreshTKDB.filter((token)=> token !== refreshToken);

    res.clearCookie("token");
    res.clearCookie("refreshToken");

    res.status(200).json({message: "Decoonexion réussie !"})
}
 
const refresh = async (req, res) => {
    const refreshToken = req.cookies["refreshToken"];
    if(!refreshToken) return res.status(401).json({message: "RefreshToken manquant"})
    if(!refreshTKDB){
        return res.status(401).json({ message: "RefreshToken invalid"})
    }
    
    try {
        const payload = decodeToken(
            token,
            process.env.REFRESH_TOKEN_KEY
        );
        const newPayload = {
            id: payload.id,
            email: payload.email,
            role: payload.role,
            name: payload.name
        };

        const newToken = generateToken(newPayload)
        res.cookie("newToken", newToken, options);
        res.status(200).json({
            message: "Connexion refreshtoken !!",
            newToken,
            refreshToken
        });

    } catch(error) {
        switch (error.name) {
            case "JsonWebTokenError":
              res.status(401).json({ message: "Token invalid" });
              break;
            case "TokenExpireError":
              res.status(401).json({ message: "Token Expire" });
              break;
            default:
              res.status(500).json({ message: "une erreur innatendue " });
              break;
        }
    }
}
/** renvoie les infos de l’utilisateur si le token est valide : */
const  guard = async (req, res) => {
    res.status(200).json({ user: req.user });
}




module.exports = { register, login, logout, refresh, guard};
