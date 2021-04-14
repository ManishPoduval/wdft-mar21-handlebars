// setup for express
const express = require("express");
const app = express();

require('dotenv').config()

console.log( process.env.PASSWORD)

const port = 3000;

// require some data form your data.js file
let {students, instructors, getStudents, getTeachers} = require('./data')

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + "/public"));

// tell express that your are using hbs as template engine
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Register a partial
let hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')


// ROUTES DEFINED BELOW

app.get("/", (req, res) => {
    // Using a promise to get data
     getStudents()
        .then((myStudents) => {
            let filteredStudents = myStudents.filter((singleStu) => {
                return singleStu.city == 'Miami'
            })
            res.render('landing.hbs', {name: 'Manish', age: 21, students: filteredStudents, layout: false })
        })
        .catch(() => {
            console.log('Something went wrong')
        })
});

app.get('/teachers', (req, res) => {
      // Using a promise to get data
    getTeachers()
        .then((teachers) => {
            //console.log(teachers)
            res.render('teachers.hbs', {instructors: teachers })
        })
        .catch(() => { 
            console.log('Error ')
        })  
})

// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);



