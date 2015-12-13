var questionlist = [];

$('document').ready(function(){
	populateTable();
	$('#btnAddQuestion').on('click', addQuestion);
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
//Add Qustion
function addQuestion(event){
	event.preventDefault();
	var newQuestion = {
		'question': $('#addQuestion fieldset input#inputQuestion').val(),
		'optionA': $('#addQuestion fieldset input#inputOptionA').val(),
		'optionB': $('#addQuestion fieldset input#inputOptionB').val(),
		'optionC': $('#addQuestion fieldset input#inputOptionC').val(),
		'optionD': $('#addQuestion fieldset input#inputOptionD').val(),
		'optionE': $('#addQuestion fieldset input#inputOptionE').val(),
		'answer': $('#addQuestion fieldset input#inputAnswer').val()
	};
	alert($('#addQuestion fieldset inputQuestion'));
	$.ajax({
			type: 'POST',
			data: newQuestion,
			url: 'questions/addquestion',
			dataType: 'JSON'
		}).done(function(reponse){
			if(reponse.msg === ''){
				alert('Success!');
			}else{
				alert('Error:' + reponse.msg);
			}
		});

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
	$('#optionA').text(question.optionA);
	$('#optionB').text(question.optionB);
	$('#optionC').text(question.optionC);
	$('#optionD').text(question.optionD);
	$('#optionE').text(question.optionE);
	$('#answer').text(question.answer);
}