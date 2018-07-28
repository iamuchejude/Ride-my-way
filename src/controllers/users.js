import bcrypt from 'bcrypt';
import db from '../database/connection';

export default class Users {
  static getAllUsers(req, res) {
    db.query('SELECT * FROM users')
      .then((firstResult) => {
        if (firstResult.rowCount < 1) {
          res.status(200).json({
            status: 'success',
            message: 'No User found',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: `${firstResult.rowCount} user(s) found`,
            users: firstResult.rows,
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static getOneUser(req, res) {
    db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
      .then((firstResult) => {
        if (firstResult.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'User does not exist',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'User found',
            user: firstResult.rows[0],
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static updateUserProfile(req, res) {
    const { name, phoneNumber } = req.body;
    db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
      .then((resultOne) => {
        if(resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'User does not exist',
          });
        } else {
          if (req.params.id !== req.authData.user.id) {
            res.status(400).json({
              status: 'success',
              message: 'You cannot update another user\'s profile',
            })
          } else {
            // Prepare Query String
            let updateQuery = 'UPDATE users SET';
            updateQuery += name !== undefined ? ' name=$1' : '';
            updateQuery += phoneNumber !== undefined ? name !== undefined ? ', phone_number=$2' : ' phone_number=$1': '';
            updateQuery += name !== undefined && phoneNumber !== undefined ? ' WHERE id=$3' : ' WHERE id=$2';
            updateQuery += ' RETURNING id,';
            updateQuery += name !== undefined && phoneNumber !== undefined ? ' name, phone_number' : name !== undefined ? ' name' : phoneNumber !== undefined ? ' phone_number' : '' ;
            updateQuery += ' created_at, updated_at';

            // Prepare QueryData
            const updateData = name !== undefined && phoneNumber !== undefined ? [name, phoneNumber] : name !== undefined ? [name] : phoneNumber !== undefined ? [phoneNumber] : '';

            db.query(updateQuery, [...updateData, req.authData.user.id])
              .then((resultTwo) => {
                res.status(200).json({
                  status: 'succes',
                  message: 'Profile updated successfully',
                  user: resultTwo.rows[0],
                });
              })
              .catch(() => {
                res.status(500).json({
                  status: 'error',
                  message: 'Internal server error. Please try again later',
                });
              })
          } 
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      })
  }

  static updateUserPassword(req, res) {
    const { password } = req.body;
    db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
      .then((resultOne) => {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'User does not exist',
          });
        } else {
          if (req.params.id !== req.authData.user.id) {
            res.status(400).json({
              status: 'success',
              message: 'You cannot update another user\'s profile',
            })
          } else {
            db.query('UPDATE users SET password=$1 WHERE id=$2', [bcrypt.hashSync(password, 8), req.params.id])
              .then(() => {
                res.status(200).json({
                  status: 'success',
                  message: 'Password updated successfully',
                })
              })
              .catch(() => {
                res.status(500).json({
                  status: 'error',
                  message: 'Internal server error. Please try again later',
                });
              })
          }
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      })
  }

  static updateUserPhoto(req, res) {
    const { photo } = req.body;
    db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
      .then((resultOne) => {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'User does not exist',
          });
        } else {
          if (req.params.id !== req.authData.user.id) {
            res.status(400).json({
              status: 'success',
              message: 'You cannot update another user\'s profile',
            })
          } else {
            db.query('UPDATE users SET photo=$1 WHERE id=$2 RETURNING id, photo, created_at, updated_at', [photo, req.authData.user.id])
              .then((resultTwo) => {
                res.status(200).json({
                  status: 'success',
                  message: 'Profile photo updated successfully!',
                  user: resultTwo.rows[0],
                })
              })
              .catch(() => {
                res.status(500).json({
                  status: 'error',
                  message: 'Internal server error. Please try again later',
                });
              })
          }
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      })
  }
}
