const validate = (req, res, next) => {
  if(req.body.name === undefined && req.body.phoneNumber === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide Name or Phone Number or both Name and Phone Number',
    });
  }

  if (req.body.email !== undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'You cannot update your email address',
    });
  }

  if (req.body.name !== undefined) {
    if (req.body.name.length < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide valid Full Names ',
      });
    }

    const hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
    if (hasNumberAndSpecialCharacters.test(req.body.name)) {
      return res.status(400).json({
        status: 'error',
        message: 'Name must contain only alphabets and spaces',
      });
    } else if (req.body.name.split(' ').length < 2 || req.body.name.split(' ')[0].length < 1 || req.body.name.split(' ')[1].length < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Name must contain valid First and Last Names. Initials are not allowed.',
      });
    }
  }

  if (req.body.phoneNumber !== undefined) {
    if (req.body.phoneNumber.length < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid Phone Number',
      });
    }
  } 

  next();
};

export default validate;