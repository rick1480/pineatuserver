const dbcon = require('../../config/dbcon/dbcon');

// ========== This functions are using by passport/config-pass.js ========= \\
/** This functions are using callbacks due to passport
 * it not work with async/await
 */

// ========== FUNCTIONS FOR LOCAL SIGNING ========== \\
// find users by their username.
exports.findUserByEmail = (userEmail, cb) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [userEmail];
  dbcon.query(query, values, cb);
};

// ====== FUNCTIONS FOR LOCAL-SIGNUP =======
// find users by their id.
exports.findUserByID = (id, cb) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const value = [id];
  dbcon.query(query, value, cb);
};

// userSignup insert user into db and encrypt user password usign bcrypt.
exports.userSignup = (user, cb) => {
  const query = `INSERT INTO users(username, password)
                               VALUES (?, ?)`;
  const values = [user.username, user.password];
  dbcon.query(query, values, cb);
};

/**
 * Function to secure end points
 */
exports.isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  }
  return next();
};

/**
   * Function to delete sessions
   */
exports.deleteSession = (sessionID, cb) => {
  const query = 'DELETE FROM sessions WHERE session_id = ?';
  const value = [sessionID];
  dbcon.query(query, value, cb);
};
