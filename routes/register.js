const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../users/usersModel');

const router = express.Router();

router.use(express.json());

router.route('/').post(async ( req, res ) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({message: "A new user must have a username and password"});
    const hash = bcrypt.hashSync(password);
    req.body.password = hash;
    try{
        const user = await db.insert(req.body);
        res.status(201).json(user);
    }
    catch(error) {
        res.status(500).json({message: "We could not register you at this time"});
    }
})

module.exports = router;