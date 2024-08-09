const express = require("express");
const userRouter = require('./routes/user.js')
const showsRouter = require("./routes/shows.js")
const app = express();


// Write routes
app.use(express.json());
app.use("/users", userRouter);
app.use("/shows", showsRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

