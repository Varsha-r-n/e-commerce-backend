var express = require('express');
var router = express.Router();
const UserModel = require("../modals/User")

const jwt = require('jsonwebtoken');
const JWT_SECRET = "ayivddkkeezbdsjxhzurjzixekoiipnq";
const authenticateToken = require('../autheticateToken');
/* GET users listing. */
router.get('/', authenticateToken, async function(req, res) {
  let users = await UserModel.find({});
  res.send(users);
});
router.get('/:id', authenticateToken, async function(req, res) {
  let user = await UserModel.findById(req.params.id);
  res.send({
    email: user.email,
    mobNo: user.mobNo,
    name: user.name
  });
});
router.post('/register', async function(req, res) {
  try{
    const SaveUser = new UserModel(req.body)
    const user = await SaveUser.save();
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
  }catch(error){
    console.log(error);
    throw error;
  }
});

router.post('/login', async function(req, res, next) {
  try{
     const loginCredentials = {
      email: req.body.username,
      password: req.body.password
     }
    let user = await UserModel.find(loginCredentials);
    if(user.length > 0){
      user = user[0];
      const token = jwt.sign({ id: user.id, username: user.email }, JWT_SECRET);
      res.json({ token, id: user.id });
    }else{
      res.status(403).send('Unauthorized')
    }
  }catch(error){
    console.log(error);
    throw error;
  }
});

module.exports = router;
