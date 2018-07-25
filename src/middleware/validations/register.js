import validateEmail from './../../util/validate_email';

const validate = (req, res, next) => {
  console.log(req);

  if (!req.body.name || req.body.name === null || req.body.name === undefined) {
    res.status(403).json({
      status: 'error',
      message: 'Please provide Full Names',
    });
    return false;
  }

  const hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
  if (hasNumberAndSpecialCharacters.test(req.body.name)) {
    res.status(403).json({
      status: 'error',
      message: 'Name must contain only alphabets and spaces',
    });
    return false;
  } else if (req.body.name.split(' ').length < 2 || req.body.name.split(' ')[0].length < 1 || req.body.name.split(' ')[1].length < 1) {
    res.status(403).json({
      status: 'error',
      message: 'Please provide valid First and Last Names',
    });
    return false;
  }


  if (!req.body.email || req.body.email === null || req.body.email === undefined) {
    res.status(403).json({
      status: 'error',
      message: 'Please provide a valid Email',
    });
  } else if (!validateEmail(req.body.email)) {
    res.status(403).json({
      status: 'error',
      message: 'Email is invalid',
    });
    return false;
  }


  if (!req.body.password || req.body.password === null || req.body.password === undefined) {
    res.status(403).json({
      status: 'error',
      message: 'Please provide password',
    });
    return false;
  }

  next();
};

export default validate;
