import express from "express";
import passport from 'passport';
import { register, login, logout } from "../controllers/authController.js";


const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.post("/logout", logout);

//GOOGLE AUTH
//initiate Google Auth
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));


//callback URL after auth
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }),
(req, res) =>{
    res.send(" Google Authentication Successful ");
}
);


//failure routes
router.get('/failure', (req, res) => {
    res.send('❌ Google Authentication Failed');
  });


 //facebook oath 
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email'],
}));


//callback URL after auth
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/fbfailure' }),
(req, res) =>{
    res.send(" Facebook Authentication Successful ");
}
);


//failure routes
router.get('/fbfailure', (req, res) => {
    res.send('❌  Facebook Authentication Failed');
  });


 

export default router;
