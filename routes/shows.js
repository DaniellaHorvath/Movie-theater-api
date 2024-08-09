const express = require("express");
const { User, Show } = require("../models/index.js")
const router = express.Router();
const {check, validationResult} = require("express-validator");


// - `GET` all shows: GET/shows

// router.get("/", async (req, res) => {
//     const shows = await Show.findAll();
//     res.json(shows);
// })

// - `GET` shows of a particular genre (genre in `req.query`): GET/shows?genre=
router.get("/", async (req, res) => {


    const queryString = req.query
    
    if(queryString.genre){
        const allShowsForThisQuery = await Show.findAll({ 
            where: { genre: queryString.genre}});
        res.status(200).send(allShowsForThisQuery); 
    }else{
        const allShows = await Show.findAll();
        res.status(200).send(allShows)
    }
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


// Add Server Side Validation to ensure show titles can be no longer than 25 characters in length
router.post("/", 
    check("title").isLength({min: 1, max: 25}).trim(),
    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.json({ error: errors.array()});
            return;
        }

        const newShow = req.body;
        const creatednewShow = await Show.create(newShow);
        res.status(201).json(creatednewShow);

})

// - `DELETE` a show DELETE/shows/:showId
router.delete("/:showId", async (req, res) => {
    const show = await Show.findByPk(req.params.showId);
    await show.destroy();
    res.json(show);

})





module.exports = router; 