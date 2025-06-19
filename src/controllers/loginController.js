const bcrypt = require('bcrypt');

function login(req,res){
    if(req.session.loggedin != true){
        res.render('login/index');
    } else {
        res.redirect('/');
    }
}

function auth(req, res) {
    const data = req.body;

    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM users WHERE usuario =?', [data.usuario],(err, userdata) =>{
            if(userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) =>{
                        if(!isMatch){
                            res.render('login/index', { error: 'Error: incorrect password !'});
                        } else {
                            req.session.loggedin = true;
                            req.session.name = element.name;

                            res.redirect('/');
                        }
                    });
                });
            } else {
                res.render('login/index', {error: 'Error: user not exists !'});
            }
        });
    });
}


function register(req,res){
    if(req.session.loggedin != true){
        res.render('login/register');
    } else {
        res.redirect('/');
    }
}

function storeUser(req, res){
    const data =req.body;

    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM users WHERE usuario =?', [data.usuario],(err, userdata) =>{
            if(userdata.length > 0){
                res.render('login/register', { error: 'Error: User Already exists !'});
            } else {
                bcrypt.hash(data.password,12).then(hash =>{
                    data.password = hash;
                    
                    req.getConnection((err, conn)=>{
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) =>{

                            /*
                            req.session.loggedin = true;
                            req.session.name = data.name;
                            */

                            res.redirect('/');
                        })
                    });
                });
            }
        })
    })
}

function logout(req, res) {
    if (req.session.loggedin == true) {
        req.session.destroy();
        res.redirect('/login');
    } else {
        res.redirect('/login');
    }
}
  

module.exports = {
    login: login,
    register: register,
    storeUser,
    auth,
    logout,
}