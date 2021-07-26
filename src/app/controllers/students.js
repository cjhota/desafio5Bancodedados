const fs = require("fs");
const data = require("../data.json");
const {
  age,
  date,
  graduation,
  grade
} = require("../utils");

// exports.index = function (req, res) {

//     return res.render("students/index", {
//       students: data.students
//     });
//   },

exports.index = function (req, res) {
    const students = data.students.map(function (student) {
      return {
        ...student,
        // services: student.services.split(",")
        education:grade(student.education)
      }

    })

    //  console.log(students)

    return res.render("students/index", {
      students
    });
  },

  // create
 
  exports.create = function (req, res) {
    return res.render("students/create");
  },

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    //req.body.key ==""
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }

  birth = Date.parse(req.body.birth);

  // const created_at = Date.now();

  let id = 1;
  const lastStudent = data.students[data.students.length - 1]

  if (lastStudent) {
    id = lastStudent.id + 1
  }

  data.students.push({
    id,
    ...req.body,
    birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("White file error!");

    return res.redirect("/students/${id}");
  });

  //   return res.send(req.body);
};

//show
exports.show = function (req, res) {
  //req.params
  const {
    id
  } = req.params;

  const foundStudent = data.students.find(function (student) {
    return student.id == id;
  });

  if (!foundStudent) return res.send("Student not found");

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).birthDay,
    education: grade(foundStudent.education)
    // services: foundStudent.services.split(","),
    // created_at: new Intl.DateTimeFormat("pt-BR").format(
    //   foundStudent.created_at
    // // ),
  };

  return res.render("students/show", {
    student
  });
};

//Edit
exports.edit = function (req, res) {
  const {
    id
  } = req.params;

  const foundStudent = data.students.find(function (student) {
    return student.id == id;
  });

  if (!foundStudent) return res.send("Student not found");

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).iso,
    // education: graduation(foundStudent.education),
  };

  return res.render("students/edit", {
    student
  });
};

//put
exports.put = function (req, res) {
  const {
    id
  } = req.body;
  let index = 0;

  const foundStudent = data.students.find(function (student, foundIndex) {
    // return student.id == id;
    if (id == student.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundStudent) return res.send("Student not found");

  const student = {
    ...foundStudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  };

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("White file error!");

    return res.redirect(`/students/${id}`);

    console.log(`/students/${id}`);
  });
};

//delete
exports.delete = function (req, res) {
  const {
    id
  } = req.body

  const filteredStudents = data.students.filter(function (student) {
    return student.id != id
  })

  data.students = filteredStudents

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error!")

    return res.redirect("/students")
    // console.log(`/students/${id}`);

  })
}