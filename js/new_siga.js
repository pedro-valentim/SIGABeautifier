$(function(){
	$('#Grid1ContainerDiv #Grid1ContainerTbl')
	$('#Grid1ContainerDiv #Grid1ContainerTbl tr.GridClearOdd').each(function(index, el){
		var disciplina = $('td:eq(1)', $(this));
		var parts = disciplina.text().split('<br>');
		var horas_aula_label = $('<span />').addClass('ns-label ns-label-primary').text(parts[1]);
		disciplina.html(horas_aula_label);
		disciplina.append(parts[0]);
	});
});