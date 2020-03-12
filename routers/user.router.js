var express = require('express')

var router = express.Router();
var db = require('../db');


router.get('/user', function(req, res){
	res.render('./users')
});
router.get('/', function(req,res){
	res.render('./users/index.pug', {
		users: db.get('users').value()
	})
});

router.get('/:id', function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({ id: id })
	.value();
	res.render('./users/users', {
		name: user.name,
		id: user.id
	});
});

module.exports = router;