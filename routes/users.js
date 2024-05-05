var express = require('express');
var router = express.Router();
var fs = require('fs');
const filename = 'db.csv'
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', async function(req, res, next) {
  try{

    const data = await fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    let id=0;
    if(data===''){
      id=1;
    }else{
      const users = data.split('\n');
      id=users.length;
    }
    const fileString = `${id},${req.body.name},${req.body.email},${req.body.mobNo},${req.body.password}\n`;
    fs.appendFileSync(filename, fileString, 'utf8', function (err) {
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
      } else{
        console.log('It\'s saved!');
      }
    });
    res.send(`User ${req.body.name} is saved.`);
  }catch(error){
    console.log(error);
    throw error;
  }
});

router.post('/login', async function(req, res, next) {
  try{
    const data = await fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const users = data.split('\n');
    const userName = req.body.username;
    const password = req.body.password;
    const user = users.find(user => {
      const userDetails = user.split(',');
      if(userName === userDetails[2] && password === userDetails[4]){
        return true;
      }
    })
    if(user){
      res.send('success');
    }else{
      res.status(403).send('Unauthorized')
    }
  }catch(error){
    console.log(error);
    throw error;
  }
});

module.exports = router;
