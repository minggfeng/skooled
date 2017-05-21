// module.exports.up = function (knex, Promise) {
module.exports = function (knex, Promise) {

  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('email', 80).unique();
        table.string('password', 60);
        table.string('first_name', 80);
        table.string('last_name', 80);
        table.string('phone_number', 20);
        table.string('role', 20);
      });
    }
  });

  knex.schema.hasTable('students').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('students', (table) => {
      table.increments('id');
      table.string('first_name', 80);
      table.string('last_name', 80);
      table.float('gpa',2);
      table.integer('attendance');
      table.string('photo');
      });
    }
  });

  knex.schema.hasTable('users_students').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users_students', (table) => {
      table.increments('id');
      table.integer('id_user').references('users.id');
      table.integer('id_student').references('students.id');
    })
    }
  });

  knex.schema.hasTable('documents')
  .then(exists => {
    if (!exists) {
      return knex.schema.createTable('documents', (table) => {
        table.increments('id');
        table.string('title', 250);
        table.string('body', 10000);
        table.boolean('permissioned', false);
        table.integer('id_student');
        table.string('first_name_student');
        table.string('last_name_student');
      }).catch((error) => {
        console.log('database error:', error);
      });
    }
  });

  knex.schema.hasTable('classes').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('classes', (table) => {
      table.increments('id');
      table.string('name').unique();
    })
    }
  });

  knex.schema.hasTable('classes_teacher').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('classes_teacher', (table) => {
      table.increments('id');
      table.integer('class_id').references('classes.id');
      table.integer('teacher_id').references('users.id');
    })
    }
  });

  knex.schema.hasTable('classes_student').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('classes_student', (table) => {
      table.increments('id');
      table.integer('class_id').references('classes.id');
      table.integer('student_id').references('students.id');
      table.string('grade');
    })
    }
  });

  knex.schema.hasTable('homework').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('homework', (table) => {
      table.increments('id');
      table.string('title');
      table.integer('teacher_id');
      table.string('questions');
    })
    }
  });

  knex.schema.hasTable('questions').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('questions', (table) => {
      table.increments('id');
      table.string('type');
      table.string('content');
      table.integer('created_by');
      table.string('created_dttm');
    })
    }
  });

  knex.schema.hasTable('classes_homework').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('classes_homework', (table) => {
      table.increments('id');
      table.integer('homework_id');
      table.integer('classes_id');
    })
    }
  });
};

// module.exports.down = function (knex, Promise) {
//   knex.schema.raw('DROP TABLE IF EXISTS users, students, users_students CASCADE');
// };
