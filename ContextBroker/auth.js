const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./user');

const jwt_secret = process.env.JWT_SECRET || 'default';

router.post('/register', async (req, res) =>{
    const{email, password} = req.body;
    try{
        const exist = await User.findOne({email});
        if(exist) return res.status(400).json({message: 'Email already exist'});

        const newUser = new User ({email, password});
        await newUser.save();

        res.status(201).json({massage: 'Successful registration'});
    } catch (error){
        res.status(500).json({error: error.massage});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ message: 'Incorrect email.' });

        const userPassword = await user.comparePassword(password);
        if(!userPassword) return res.status(400).json({ message: 'Incorrect password.' });

        const token = jwt.sign({id: user._id}, jwt_secret, {expiresIn: '1h'});
        res.json({token});

    } catch (error){
        res.status(500).json({error: error.massage });
    }
});

module.exports = router;