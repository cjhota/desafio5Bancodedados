const {
  age,
  date
} = require("../../lib/utils");
const db = require("../../config/db")


module.exports = {
  index(req, res) {

    return res.render("teachers/index")
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

    const query = `
          INSERT INTO teachers (
            avatar_url,
            name,
            birth_date,
            education_level,
            class_type,
            subjects_taught,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
      `

    const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.services,
      date(req.body.birth).iso,
      date(Date.now()).iso,
    ]

    db.query(query, values, function (err, results) {
      console.log(err)
      console.log(results)
      return
    })
  },
  show(req, res) {
    return
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