import express from "express";
import passport from 'passport';
import { register, login, logout } from "../controllers/authController.js";


const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.post("/logout", logout);


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


  //TODO: facebook oath 

export default router;
