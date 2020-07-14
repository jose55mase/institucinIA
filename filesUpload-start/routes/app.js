var express = require('express');
var router = express.Router();

const server = require('http').createServer();
const io = require('socket.io')(server);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  io.on('connection', client => {
    client.on('event', data => { console.log("conected") });
    client.on('disconnect', () => { /* … */ });
  });
});





module.exports = router;
