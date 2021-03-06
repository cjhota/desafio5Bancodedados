const { age,date,grade,graduation } = require("../lib/utils")
const Student =  require("../models/Student")


module.exports = {
    index(req, res) {
    
        let {
            filter,
            page,
            limit
        } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                students.map(student => {
                    student.education = grade(student.education)
                    return student
                  })
                return res.render("students/index", {students, pagination, filter})

            }

        }

        Student.paginate(params)

    },
    create(req, res) {

      Student.studentsSelectOptions(function(options) {
            return res.render("students/create", {teacherOptions: options})
        })

    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student}`)
        })
       
    },
    show(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found!")

            student.birth = date(student.birth).format
            student.education = grade(student.education)

            return res.render("students/show", { student })

        })
    },
    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found!")
            student.birth = date(student.birth).iso
           
           
        Student.studentsSelectOptions(function(options) {
            return res.render("students/edit", {student, teacherOptions: options})
        })

        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        Student.update(req.body, function(student) {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function(student) {
            return res.redirect(`/students`)
        })
    },
}