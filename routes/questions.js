var express = require('express');
var router = express.Router();

router.get("/",function(req, res, next){
	var db = req.db;
	var qcollection = db.get('questions');
	qcollection.find({},{},function(e, doc){
		res.json(doc);
	});
});


router.post("/", function(req, res){
	var db = req.db;
	var qcollection = db.get('questions');
	qcollection.insert(req.body, function(err, result){
		res.send(
			(err == null) ? {msg: ''} : {msg: err} 
			);
	});
});

router.delete('/:id', function(req, res){
	var db = req.db;
	var qcollection = db.get('questions');
	qcollection.remove({'_id' : req.params.id}, function(err, result){
		res.send(
			(err == null) ? {msg: ''} : {msg: err} 
			);
	});
});

module.exports = router;