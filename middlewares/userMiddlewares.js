const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

//middleware function to ensure the authorization of users when transferring funds
const authenticateToken = async (req, res, next) => {
  // console.log("in the middleware")
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
  
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  }

  module.exports = {authenticateToken};