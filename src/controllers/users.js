import db from '../database/connection';

export default class Users {
    static getAllUsers(req, res) {
        db.query('SELECT * FROM users')
            .then((result) => {
                if(result.rowCount < 1) {
                    res.status(200).json({
                        status: 'success',
                        message: 'No User found',
                        data: result.rows,
                    })
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: 'Returning all users',
                        data: result.rows,
                    })
                }
            })
            .catch((error) => {
                res.status(400).json({
                    status: 'error',
                    message: 'Error Occured',
                    error
                })
            })
    }

    static getOneUser(req, res) {
        db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
          .then((result) => {
            if(result.rowCount < 1) {
              res.status(404).json({
                status: 'error',
              })
            } else {
              res.status(200).json({
                status: 'success',
                message: 'Returning user',
                data: result.rows[0],
              })
            }
          })
          .catch((error) => {
            res.status(400).json({
              status: 'error',
              message: 'Error Occured',
              error
            })
          })
    }
}