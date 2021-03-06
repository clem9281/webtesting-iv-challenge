const db = require('../data/dbConfig');

const find = () => db('users');

const findBy = filter => db('users').where(filter);

const insert = async newUser => {
    const userId = await db('users').insert(newUser);
    const user = await findBy({ id: userId[0] }).first();
    return user;
}

const remove = filter => {
    return db('users').where(filter).del();
}

module.exports = {
    find,
    findBy,
    insert,
    remove
}