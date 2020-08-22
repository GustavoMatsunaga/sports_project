const fs = require('fs')
const data = require('../../data.json')
const {age, date} = require('../views/utils')

/************ STUDENTS FUNCTIONS   *************/
// index
exports.index = function (req,res) {
    res.render("students/index-students.html", {students: data.students})
}

// create
exports.post = function (req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!")
        }

        let {avatar_url, birth, name, interested_in, gender} = req.body

        birth = Date.parse(req.body.birth)
        const created_at = Date.now()
        const id = Number(data.students.length + 1)


        data.students.push({
            id,
            name,
            avatar_url,
            birth,
            gender,
            interested_in,
            created_at
        })

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("Write file error!")

            return res.redirect("/students")
        })
}

// show
exports.show = function (req,res) {
    // req.params
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })
    if (!foundStudent) return res.send("Student not found")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        interested_in: foundStudent.interested_in.split(","),
        created_at: new Intl.DateTimeFormat("en-US").format(foundStudent.created_at)
    }

    return res.render("students/show-students.html", {student})
}

// edit
exports.edit = function (req,res){
    // req.params
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })
    if (!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth)
    }
    
    return res.render("students/edit-students.html", {student})
}

// update
exports.put = function (req, res) {
    // req.body
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if(err) return res.send("Write error!")

        return res.redirect(`/students/${id}`)
    })
}

// delete
exports.delete = function (req,res) {
    const {id} = req.body

    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write Error!")

        return res.redirect('/students')
    })
}

// create route
exports.create = function (req,res) {
    return res.redirect("/students")
}
