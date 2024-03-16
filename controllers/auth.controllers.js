const { isEmail } = require("../utils");
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
async function registerUserController(req, res) {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
    const errors = {};

    if (!firstname || firstname.trim().length === 0) {
        errors['firstname'] = 'First name is required';
    }
    if (!lastname || lastname.trim().length === 0) {
        errors['lastname'] = 'Last name is required';
    }
    if (!email || email.trim().length === 0) {
        errors['email'] = 'Email is required';
    }
    if (!password || password.trim().length === 0) {
        errors['password'] = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors: errors });
    }

    if (!isEmail(email)) {
        errors['email'] = 'Invalid email';
        return res.status(400).json({ errors: errors });
    }

    if (password.length < 6) {
        errors['password'] = 'Password must be at least 6 characters';
        return res.status(400).json({ errors: errors });
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: { email: 'Email already exists' } });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const payload = {
            id: newUser._id,
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname

        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(201).json({ msg: 'User created successfully',token:token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: { error: 'Error creating user' } });
    }
}
async function loginUserController(req, res) {
    const { email, password } = req.body;
     const errors = {};
    if (!email || email.trim().length === 0) {
        errors['email'] = 'Email is required';
    }
    if (!password || password.trim().length === 0) {
        errors['password'] = 'Password is required';
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors: errors });
    }
    if (!isEmail(email)) {
        errors['email'] = 'Invalid email';
        return res.status(400).json({ errors: errors });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
             res.status(404).json({ errors: { email: 'Email not found' } });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             res.status(400).json({ errors: { password: 'Password is incorrect' } });
        }
        const payload = {
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: { error: 'Error logging in' } });
    }

}
async function verifyAuthController(req, res) {
    const token = req.headers["teddy-real-token"];
     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        console.log(user);
        user.id = user._id.toString();
        if(!user){
            res.status(404).json
        }

        res.json(user);
    }
    catch(error){
            res.status(500).json({ errors: { error: 'Error creating user' } });
    }
}

 




module.exports = {
    registerUserController,
    loginUserController,
    verifyAuthController
}