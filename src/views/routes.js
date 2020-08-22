const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')
const students = require('./students')

// Landing page
routes.get("/", (req,res) =>{
    res.render("tutors/index-tutors.html")
})

// instructors routes
routes.get("/instructors", instructors.index)
routes.get("/instructors/create", instructors.create)
routes.get("/instructors/:id", instructors.show)
routes.get("/instructors/:id/edit",instructors.edit)
routes.post("/instructors", instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)

// students routes
routes.get("/students", students.index)
routes.get("/students/create", students.create)
routes.get("/students/:id", students.show)
routes.get("/students/:id/edit",students.edit)
routes.post("/students", students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

module.exports = routes