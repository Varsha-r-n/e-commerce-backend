const JWT_SECRET = "ayivddkkeezbdsjxhzurjzixekoiipnq";
const jwt = require('jsonwebtoken');
// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  try{
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }catch(error){
    console.log(error)
  }
  
};

module.exports = authenticateToken;