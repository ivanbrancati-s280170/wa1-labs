/* Data Access Object (DAO) module for accessing users table of tasks.db */

'use strict' ;
const db = require('./db') ;
const bcrypt = require('bcrypt') ;

// Function to check user login
exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err); // DB error
            else if (row === undefined)
                resolve(false); // user not found
            else {
                bcrypt.compare(password, row.hash).then(result => {
                    if (result) // password matches
                        resolve({id: row.id, username: row.email, name:row.name});
                    else
                        resolve(false); // password not matching
                })
            }
        });
    });
};

// Function to get a user by id (TODO: useful or not?)
exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE id = ?';
        db.get(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            // by default the local strategy looks for 'username'
            const user = {id: row.id, username: row.email, name: row.name}
            resolve(user);
          }
      });
    });
  };

