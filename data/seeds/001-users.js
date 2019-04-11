const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {
      username: 'frodo',
      password: bcrypt.hashSync('pass', 8)
    },
    {
      username: 'sam',
      password: bcrypt.hashSync('pass', 8)
    },
    {
      username: 'merry',
      password: bcrypt.hashSync('pass', 8)
    }
  ])
};
