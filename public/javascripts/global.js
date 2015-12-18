var questionlist = [];

$('document').ready(function(){
	populateTable();
	$('#btnAddQuestion').on('click', addQuestion);
	$('#btnAddQuiz').on('click', addQuiz);
});

function populateTable(){
		var tablecontent  = '';
		$.ajax({
			type: 'GET',
			url: 'questions/questionlist',
			dataType: 'JSON'
		}).done(function(data){
			questionlist = data;
			$.each(data, function(){
				tablecontent += "<tr>";
				tablecontent += "<td><a href='#' class='linkdetail' rel='" + this._id +"'>" + this.question+"</a></td>";
				tablecontent += "<td><a href='#' class='linkdelete' rel='" + this._id +"'>Delete</a></td>";
				tablecontent += "</tr>";
			});

			$('#questionList table tbody').empty().append(tablecontent);
			$('a.linkdelete').on('click', deleteQuestion);
			$('a.linkdetail').on('click', showOptions);
		});
};
//Add Quiz
function addQuiz(event){
	event.preventDefault();
	var newQuiz = {"name": $('#addQuiz fieldset input#inputQuiz').val()};
	$.ajax({
		type:'POST',
		data: JSON.stringify(newQuiz),
		url: 'questions/addquiz',
		contentType: 'application/json',
		dataType: 'JSON'
	}).done(function(reponse){
		if(reponse.msg === '') {

		}else{
			alert('Error:' + reponse.msg);
		}
	});
	populateTable();
}
//Add Qustion
function addQuestion(event){
	event.preventDefault();
	var newQuestion = {
		'question': $('#addQuestion fieldset input#inputQuestion').val(),
		'optionss': [$('#addQuestion fieldset input#inputOptionA').val(),
		 $('#addQuestion fieldset input#inputOptionB').val(),
		 $('#addQuestion fieldset input#inputOptionC').val(),
		 $('#addQuestion fieldset input#inputOptionD').val(),
		 $('#addQuestion fieldset input#inputOptionE').val()],
		'answer': $('#addQuestion fieldset input#inputAnswer').val()
	};
	$.ajax({
			type: 'POST',
			data: JSON.stringify(newQuestion),
			url: 'questions/addquestion',
			contentType: 'application/json', 
			dataType: 'JSON'
		}).done(function(reponse){
			if(reponse.msg === ''){
				//alert('Success!');
			}else{
				alert('Error:' + reponse.msg);
			}
		});

		$('#addQuestion fieldset input#inputQuestion').val('');
		$('#addQuestion fieldset input#inputOptionA').val('');
		$('#addQuestion fieldset input#inputOptionB').val('');
		$('#addQuestion fieldset input#inputOptionC').val('');
		$('#addQuestion fieldset input#inputOptionD').val('');
		$('#addQuestion fieldset input#inputOptionE').val('');
		$('#addQuestion fieldset input#inputAnswer').val('');

	populateTable();
};

//Delete question
function deleteQuestion(event){
	event.preventDefault();
	$.ajax({
		type: 'DELETE',
		url: 'questions/deletequestion/' + $(this).attr('rel')
	}).done(function(response){
		if(response.msg ===''){

		}else{
			alert('Error:' + response.msg);
		}
	});
	populateTable();
}

function showOptions(event){
	event.preventDefault();
	var position = questionlist.map(function(question){return question._id}).indexOf($(this).attr('rel'));
	var question = questionlist[position];
	var questiondetail = "";
	for(var option in question.optionss){

		questiondetail += '<span>' + question.optionss[option] + '</span></br>';
	}
	questiondetail += '<strong>Answer:</strong><span>' + question.answer + '</span>';
	$('#questiondetail').empty();
	$('#questiondetail').append(questiondetail);
}