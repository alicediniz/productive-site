// ENTRADA DE UMA NOVA TAREFA
$("input").keypress(function(event){
	if (event.which === 13) {
		var newTask = $(this).val();
		$(this).val("");
		$("tbody").append('<tr class="toDoItem"><td class="task"><span><i class="far fa-trash-alt"></i></span>' + newTask + ' </td></tr>');
	}
});

// CLICANDO NA TECLA +
$(".fa-plus").click(function(){
	$("tbody").fadeToggle("slow","linear");	
});


// TAREFA
	// COMPLETA	
$(document).on("click",".task", function (event){
	$(this).toggleClass("completed");
	event.preventDefault();
});
	// EXCLUIR
$(document).on("click","span", function(event){
	$(this).parents().eq(1).remove();
	// event.stopPropagation();
});