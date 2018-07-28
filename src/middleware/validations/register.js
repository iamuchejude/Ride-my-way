import validateEmail from './../../util/validate_email';

const validate = (req, res, next) => {
  if (!req.body.name || req.body.name === null || req.body.name === undefined) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide Full Names',
    });
  }

  const hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
  if (hasNumberAndSpecialCharacters.test(req.body.name)) {
    return tres.status(403).json({
      status: 'error',
      message: 'Name must contain only alphabets and spaces',
    });
  } else if (req.body.name.split(' ').length < 2 || req.body.name.split(' ')[0].length < 1 || req.body.name.split(' ')[1].length < 1) {
    return res.status(403).json({
      status: 'error',
      message: 'Name must contain valid First and Last Names. Initials are not allowed.',
    });
  }


  if (!req.body.email || req.body.email === null || req.body.email === undefined) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide a valid Email',
    });
  } else if (!validateEmail(req.body.email)) {
    return res.status(403).json({
      status: 'error',
      message: 'Email is invalid',
    });
  }

  if (!req.body.password || req.body.password === null || req.body.password === undefined) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide password',
    });
  }

  if(req.body.password.length < 6) {
    return res.status(400).json({
      status: 'error',
      message: 'Password is too short. Password must contain at least 6 characters'
    });
  }

  next();
};

export default validate;
