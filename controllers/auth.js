const mysql=require("mysql");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const async = require("hbs/lib/async");
const express = require("express");
const dotenv=require("dotenv");

const db= mysql.createConnection({

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


/// For regestration page
exports.register=(req,res)=>{
    console.log(req.body);

  
const {name,email,password,passwordconfirm,verify}=req.body;


////////// Check if email is already exist


db.query(' SELECT email FROM users WHERE email=?',[email],async(error,results)=>{
  if(error){
      console.log(error);
  }

  if(results.length>0){
      return res.render('register',{
          message:'That email is already in use'
      })
}

////////////  check if the entered password in confirm password field is the same as the first entered password
      else if (password !=passwordconfirm ){
          return res.render('register',{
              message:'password do not match'
              

      });
  
  }

  //////////// Hashing password

let hashpassword=await bcrypt.hash(password,8);
console.log(hashpassword);

db.query('INSERT INTO  users SET ? ',{name:name,email:email,password:hashpassword},(error,results)=>{

if (error){
  console.log(error);

}

///////////// If everything done well
else{
  console.log(results);
  return res.render('register',{
      message:'User registered'

});

}

});

});


}

exports.login = async (req, res, next) => {
  const { email, password,verify } = req.body;

  // //// Check if email and password exist (Entry of password and email is empty)
  if (!email || !password) {
    return res.status(400).render("login", {
      message: 'Please provide email and password'
    });
  }

  ////// Check if user exists && password is correct
  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    console.log(results);
    console.log(password);
    const isMatch = await bcrypt.compare(password, results[0].password);
    console.log(isMatch);
    if(!results || !isMatch ) {
      return res.status(401).render("login", {
        message: 'Incorrect email or password'
      });
    } 
  
    else{
      if(results[0].verify=='1'){
        return res.redirect('/');
      }
      else {
        return res.status(403).render("login", {
          message: 'Your email does not verify'
          
        });


      }
      }
    });
  }
  
// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log("decoded");
      console.log(decoded);

      // 2) Check if user still exists
      db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
        console.log(result)
        if(!result) {
          return next();
        }
        // THERE IS A LOGGED IN USER
        req.user = result[0];
        // res.locals.user = result[0];
        console.log("next")
        return next();
      });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};

exports.logout = (req,res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};
