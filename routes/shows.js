const express = require("express");
const { User, Show } = require("../models/index.js")
const router = express.Router();


// - `GET` all shows: GET/shows

router.get("/", async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
})

// - `GET` one show: GET/shows/:showId

router.get("/:showId", async (req, res) => {
    const show = await Show.findByPk(req.params.showId);

    if(!show){
        res.status(404).json({ error: 'Show not found'});
        return;
    }
    res.json(show);
})


// - `GET` all users who watched a show: GET/:showId/users

router.get("/:showId/users/", async (req, res) => {
    const show = await Show.findByPk(req.params.showId);

    if(!show){
        // res.status(404).json({ error: 'Show not found'});
        res.json([]);
        return;
    }
    const users = await show.getUsers();
    res.json(users);
});

// - `PUT` update the `available` property of a show: PATCH/shows/:showId
router.patch("/:showId", async (req, res) =>{
    const show = await Show.findByPk(req.params.showId);

    if(!show) {
        res.status(404).json({ error: 'Show not found'});
        return;
    }
    const showUpdate = req.body;
    await show.update(showUpdate);
    res.send(show);
})                                                                              

// - `DELETE` a show DELETE/shows/:showId
router.delete("/:showId", async (req, res) => {
    const show = await Show.findByPk(req.params.showId);
    await show.destroy();
    res.json(show);

})

// - `GET` shows of a particular genre (genre in `req.query`): GET/shows?genre=


module.exports = router; 