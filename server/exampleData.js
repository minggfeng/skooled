var pg = require('../psql-database');
var Promise = require('bluebird');

pg.insertUser({
  email: '123abc@example.com',
  password: '123',
  firstName: 'John',
  lastName: 'Doe',
  phone: '18001234567',
  role: 'teacher'
}, (error, data) => {
  if (error) {
    console.error('Error inserting fake user.', error);
  } else {
    console.log('Inserted fake user ok.', data);
  }
});

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var userGenerator = (letter, role) => {
  return {
    email: `${role}${letter}@example.com`,
    password: letter,
    firstName: `${role}${letter}`,
    lastName: `${role}${letter}`,
    phone: '18001234567',
    role: role  
  }
}

var studentGenerator = (letter) => {
  return {
    firstName: `Student${letter}`,
    lastName: `Student${letter}`
  }
}

var classGenerator = (letter) => {
  return {
    name: `class${letter}`
  }
}

var teacherMassInsert = () => {
  for (var i = 0; i < 6; i++) {
    let letter = alphabet[i];
    let teacher = userGenerator(letter, 'teacher');
    pg.insertUser(teacher, (err, teacherData) => {
      if (err) {
        console.log(`Error on ${letter}`);
      }
      if (teacherData) {
        console.log(`Inserted teacher${letter}`);
      }
    })
  }
}

var studentMassInsert = () => {
  for (var i = 0; i < alphabet.length; i++) {
    let letter = alphabet[i];
    let studentObj = studentGenerator(letter);
    pg.insertStudent(studentObj, (err, studentData) => {
      if (err) {
        console.log(`Error on student${letter}`);
      }
      if (studentData) {
        console.log(`Inserted student${letter}`);
      }
    })
  }
}

var parentMassInsert = () => {
  for (var i = 0; i < 6; i++) {
    let letter = alphabet[i];
    let parentObj = userGenerator(letter, 'parent');
    pg.insertUser(parentObj, (err, parentData) => {
      if (err) {
        console.log(`Error on parent${letter}`);
      }
      if (parentData) {
        console.log(`Inserted parent${letter}`);
      }
    })
  }
}

var classMassInsert = () => {
  for (var i = 0; i < 12; i++) {
    let letter = alphabet[i];
    let classObj = classGenerator(letter);
    pg.insertClass(classObj, (err, classData) => {
      if (err) {
        console.log(`Error on class${letter}`);
      }
      if (classData) {
        console.log(`Inserted class${letter}`);
      }
    })
  }
}

var makeStudentParentRelationships = () => {
  pg.selectAllUsersByRole('parent', (err, userData) => {
    Promise.map(userData.models, (model) => {
      return model.attributes.id;
    })
    .then((userIds) => {
      let users = userIds;
      let numberofParents = users.length;
        pg.selectAllStudents((err, students) => {
          if (students) {
            for (var i = 0; i < students.length/2; i++) {
              let parentIndex = Math.floor(numberofParents * Math.random());
              let studentId = students.models[i].attributes.id;
              pg.insertUserStudent(users[parentIndex], studentId);
            }
          }
        })
      })
  })
}

var makeClassesTeacherRelationships = () => {
  pg.selectAllUsersByRole('teacher', (err, userData) => {
    Promise.map(userData.models, (model) => {
      return model.attributes.id;
    })
    .then((userIds) => {
      let users = userIds;
      let numberofTeachers = users.length;
        pg.selectAllClasses((err, classes) => {
          if (classes) {
            for (var i = 0; i < classes.length; i++) {
              let teacherIndex = Math.floor(numberofTeachers * Math.random());
              let teacherId = users[teacherIndex];
              let classId = classes.models[i].attributes.id;
              pg.insertClassesTeachers(classId, teacherId);
            }
          }
        })
    })
  })
}

var makeStudentRelationships = () => {
  pg.selectAllStudents((err, students) => {
    if (students) {
      Promise.map(students.models, (model) => {
        return model.attributes.id;
      })
      .then((students) => {
        pg.selectAllClasses((err, classes) => {
          if (classes) {
            Promise.map(classes.models, (model) => {
              return model.attributes.id;
            })
            .then((classesIds) => {
              let numOfClasses = classesIds.length;
              for (var i = 0; i < students.length; i++) {
                let studentId = students[i];
                let randomClass = classesIds[Math.floor(numOfClasses * Math.random())];
                pg.insertClassesStudent(randomClass, studentId);
                pg.selectClassesTeacher({ class_id: randomClass}, (err, classesTeacher) => {
                  let teacherId = classesTeacher.attributes.teacher_id;
                  pg.insertUserStudent(teacherId, studentId);
                })
              }
            })
          }
        })
      })
    }
  })
}

teacherMassInsert();
studentMassInsert();
parentMassInsert();
classMassInsert();
makeStudentParentRelationships();
makeClassesTeacherRelationships();
makeStudentRelationships();




