var express = require('express');
var router = express.Router();

router.get("/questionlist",function(req, res, next){
	var db = req.db;
	var qcollection = db.get('questionlist');
	qcollection.find({},{},function(e, doc){
		res.json(doc);
	});
});

router.post("/addquestion", function(req, res){
	var db = req.db;
	var qcollection = db.get('questionlist');
	qcollection.insert(req.body, function(err, result){
		res.send(
			(err == null) ? {msg: ''} : {msg: err} 
			);
	});
});

router.delete('/deletequestion/:id', function(req, res){
	var db = req.db;
	var qcollection = db.get('questionlist');
	qcollection.remove({'_id' : req.params.id}, function(err, result){
		res.send(
			(err == null) ? {msg: ''} : {msg: err} 
			);
	});
});

module.exports = router;