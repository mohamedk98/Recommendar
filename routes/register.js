let express = require('express');
let router = express.Router();
let connection = require('../routes/connection')
const bcrypt = require('bcrypt');


router.get('/register',function (req,res,next){
    res.render('register')
})

router.post('/register',function(req,res,next){
    full_name = req.body.full_name
    email = req.body.email
    password = req.body.password

    bcrypt.hash(password, 10, function(err, hash) {
        if (err) throw err

        connection.query(`SELECT email FROM user WHERE email = '${email}' `, function (error, results, fields) {
            if (error) throw error;
            
            if (results.length == 0){
                connection.query(`INSERT INTO user (name, email, password) VALUES ('${full_name}','${email}','${hash}')`, function (error, results, fields) {
                    if (error) throw error;
                    res.send({success:'Account Created Successfully ♥'})
                  });
            }
            else {
                res.send ({error:'Email ALready Used'})
            }
          });

      
    });



})



module.exports = router;