const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../users/usersModel');

const router = express.Router();

router.use(express.json());

router.route('/:id').delete(async (req, res) => {
    try {
        const deleted = await db.remove({ id: req.params.id });
        if (deleted === 0) return res.status(404).json({ message: "There is no user at that id" });
        const users = await db.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "We could not delete that user at this time" })
    }
})

module.exports = router;