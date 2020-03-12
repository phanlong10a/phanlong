var express = require('express');
var app = express();
var port = 3000;
var db = require('./db')
var shortid = require('shortid')
var userRouter = require('./routers/user.router')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/users', userRouter);

app.get('/', function(req, res){
	res.render('index');
})
app.post('/', function(req, res) {
	var userindex = {
		name : req.body.name,
		id : shortid.generate()
	}
	db.get('users').push(userindex).write();
	res.redirect('users')
});
app.get('/delete/:id', function(req, res){
	var id = parseInt(req.params.id);
	var name = db.get('users').find({ id: id })
	.value();
	db.get('users').remove(name)
	.write();
	res.redirect('../users');
})
















app.listen(port, () => console.log(`Example app listening on port${port}!`));