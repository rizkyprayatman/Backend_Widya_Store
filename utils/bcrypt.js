const bcryptjs = require('bcrypt');

const bcrypt = {
  async hash(value) {
    return new Promise((resolve, reject) => {
      bcryptjs.hash(value, 10, (err, hash) => {
        if (err) reject(err);

        resolve(hash);
      });
    })
  },

  async compare(plain, hash) {
    return new Promise((resolve, reject) => {
      bcryptjs.compare(plain, hash, (err, success) => {
        // wrong password
        if (err) reject(err);

        resolve(success);
      });
    });
  }
}

module.exports = bcrypt;