const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

  try {

    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json(
        { 
          error: 'Not authorized with token: Denied'
        }
      );
    } 

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json(
        { 
          message: 'Token was not verified: Denied',
        }
      );
    }

    req.user = verified; // .id ???

    next();

  } catch (err) {
  
    res.status(500).json(
      {
        error: err.message
      }
    );
  }
}

module.exports = auth;