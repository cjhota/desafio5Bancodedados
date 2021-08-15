const Teacher = require("../models/Teacher")
const {age, date, graduation, grade } = require("../../lib/utils");

module.exports = {
  index(req, res) {

  Teacher.all(function(teachers) {
    return res.render("teachers/index", {teachers})
  })

  },
  create(req, res) {
    return res.render("teachers/create")

  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!")
      }
    }

   Teacher.create(req.body, function(teacher) {
    return res.redirect(`/teachers/${teacher.id}`)
    
   })
  },
  show(req, res) {
    Teacher.find(req.params.id, function(teacher) {
      if(!teacher) return res.send("Teacher not found")

      teacher.age =  age(teacher.birth_date)
      teacher.subjects_taught = teacher.subjects_taught.split(",")
      teacher.education_level = graduation(teacher.education_level)
      // teacher.class_type = modalidad(teacher.class_type)

      teacher.created_at = date(teacher.created_at).format

      return res.render("teachers/show", {teacher})

    })
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!")
      }
    }
    return
  },
  delete(req, res) {
    return
  },
}