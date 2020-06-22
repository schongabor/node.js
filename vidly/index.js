const express = require("express");
const Joi = require("@hapi/joi");
const { array } = require("@hapi/joi");

const app = express();
app.use(express.json());

const genres = [
    {
        id: 1,
        name: "horror"
    },
    {
        id: 2,
        name: "sitcom"
    },
    {
        id: 3,
        name: "bio"
    }
]

app.get("/", (req, res) => {
    res.send("There is no frontend :)");
});

app.get("/api/genres", (req, res) => {
    res.send(genres)
});

app.get("/api/genres/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const genre = genres.find(genre => genre.id === id);
    if(!genre) return res.status(404).send("There are no matches in the database");
    res.send(genre);
});

app.post("/api/genres", (req, res) => {
    //validate input
    const newID = genres.length + 1;
    const input = req.body;
    const {error} = validate(input);

    if(error) return res.status(400).send(error.message);
    //save input
    const genre = {
        id: newID,
        name: req.body.name
    }

    genres.push(genre);

    res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const input = req.body;
    //check if exists
    const genre = genres.find(genre => genre.id === id);
    if(!genre) return res.status(404).send("There are no matches in the database");
    //validate input
    const {error} = validate(input);
    if(error) return res.status(400).send(error.message);
    //update
    const index = genres.indexOf(genre);
    genres[index].name = input.name;
    //send result
    res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
    //check if exists
    const id = parseInt(req.params.id);
    const genre = genres.find(genre => genre.id === id);
    if(!genre) return res.status(404).send("There are no matchen in the database");
    //delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validate(input){
    const schema = Joi.object({
        name: Joi
                .string()
                .min(3)
                .max(30)
                .required()
    })

    return schema.validate(input);
}





const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})