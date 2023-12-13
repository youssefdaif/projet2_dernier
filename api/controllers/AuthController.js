const db = require('../models');


function login(req, res, next){

    const { email, password } = req.body;

    db.User.findOne({ where: { email: email, password: password }, include: [db.Role], }).then(user =>{

        if (user != null) {
            const user_id = user.user_id;
            const role = user.Role.name;
            const userCredentials = { user_id, role };

            req.user = userCredentials;
            next();

        } else {
           res.status(404).json({ message: 'there is no user with this credencials. try again or register' });
        }
       

    }).catch(err =>{

        res.status(500).json({ massage: 'Server Error.' });

    })

}



async function signup(req, res){

    const { first_name, last_name, email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email: email } });

        if (user == null) {
            const response = db.User.create({ first_name, last_name, email, password });

            if (response) {
                res.status(200).json({ message: 'You created your account successfully 😊 👌' });
            }
           
        } else {
            res.status(400).json({ message: 'User already exists try another email.' });
        }

    } catch (error) {
        res.status(500).json({ massage: error });
    }

}



function logout (req, res, next){

    res.cookie("refreshToken", '', {
        secure: false,
        httpOnly: true,
    })

    next();
    
}


module.exports = {

    login,
    signup,
    logout
}