export default class Users {
    static getOneUser(req, res) {
        const { id } = req.params;
        const user = {};
        if(2 < 1) {
            res.status(200).json({
                status: 'success',
                message: 'User was found.',
                data: user
            });
        } else {
            res.status(200).json({
                status: 'error',
                message: 'User was not found.',
            });
        }
    }
}