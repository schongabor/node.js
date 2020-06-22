const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    {
        id: 1,
        name: "course1"
    },
    {
        id: 2,
        name: "course2"
    },
    {
        id: 3,
        name: "course3"
    }
];

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(currentValue => currentValue.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The coure with the given ID was not found");
    res.send(course);
});

app.post("/api/courses", (req, res) => {

    const {error} = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);

    res.send(course);

});

app.put("/api/courses/:id", (req, res) => {
    // Look up the course
    //If not exists, return 404
    const course = courses.find(currentValue => currentValue.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The coure with the given ID was not found");

    //Validate
    //If invalide, return 400 - Bad request
    const {error} = validateCourse(req.body);

    if(error) return res.status(400).send(result.error.details[0].message);


    //Return updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    //Look up the course
    //Not existing, return 404
    const course = courses.find(currentValue => currentValue.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The coure with the given ID was not found");

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same course
    res.send(course);
})



function validateCourse(course) {

    const schema = {
        name: Joi
                .string()
                .min(3)
                .required()
    }
    
    return Joi.validate(course, schema);

}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});