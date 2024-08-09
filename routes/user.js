const express = require("express");
const { User, Show } = require("../models/index.js")
const router = express.Router();

// - `GET` all shows: GET/users
router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
})

// - `GET` one show: GET/users/:userId
router.get("/:userId", async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if(!user){
        res.status(404).json({error: 'User not found'});
        return;
    }
    res.json(user);
})

// - `GET` all users who watched a show: GET /users/:userId/show
router.get("/:userId/shows", async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if(!user){     // send back an empty array if the user doesn't igsist 
        res.json([])
        return;
    }
    const shows = await user.getShows(); // get the shows that user has watched, getShows() ---> belongstoMany
    res.json(shows);
})

// - `PUT` update the `available` property of a show: PUT /users/:userId/show/:userId
router.put("/:userId/shows/:showId", async (req, res) => {
    const user = await User.findByPk(req.params.userId); // find the user

    if(!user){
        res.status(400).json({error: 'Cannot associate a show with a user that does not exist'});
        return;
    }
    const show = await Show.findByPk(req.params.showId);

    if(!show){
        res.status(400).json({error: 'Cannot associate a user with a show that does not exist'});
        return;
    }

    await user.addShow(show);
    res.status(204).send();

})


module.exports = router;