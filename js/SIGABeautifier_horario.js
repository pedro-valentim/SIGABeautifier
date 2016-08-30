$(function(){

	// Adiciona botão de impressão
	$("<button onclick='javascript:print();' />")
		.text("Imprimir horários")
		.addClass("sigabeautifier-btn-print sigabeautifier-btn sigabeautifier-btn-primary sigabeautifier-pull-right no-print")
		.addClass("sigabeautifier-absolute-right")
		.insertBefore( "#TABLE2" );

	$("#TABELAINTERNA_MPAGE td:eq(0)").addClass("no-print");

	$("#TEXTBLOCK11 > input").remove();

	sigabeautifier.disciplinas = [];

	// Para cada matéria na tabela de matérias...
	$("#Grid1ContainerDiv #Grid1ContainerTbl tr[class^=GridClear]").each(function(i, el){
		var nome_horasaula = $("td:eq(1)", $(this)).text().split("<br>");
		sigabeautifier.disciplinas.push({
			sigla: $("td:eq(0)", $(this)).text(),
			nome: nome_horasaula[0],
			horas_aula: nome_horasaula[1],
			turma: $("td:eq(2)", $(this)).text(),
			professor: $("td:eq(3)", $(this)).text()
		});
	});


	var dias_semana = [
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado'
	];

	sigabeautifier.dias = [];

	var i = 0;

	// Para cada dia da semana na tabela de horarios/dias...
	$("#TABLE3 table.GridClear").each(function(i, horario_dia) {
		var dia = {
			nome: dias_semana[i],
			horarios: []
		};

		// Para cada aula/horário do dia
		$("tr[class^=GridClear]", horario_dia).each(function(i, horario_aula){
			var _horario_bruto = $("td:eq(1)", horario_aula).text().split("-");
			var _horario_inicio = _horario_bruto[0];
			var _horario_final = _horario_bruto[1];
			var _sigla = $("td:eq(2)", horario_aula).text();
			var _disciplina = sigabeautifier.disciplinas.find(function(element, index, array) {
				return element.sigla == _sigla;
			});

			dia.horarios.push({
				inicio: new Date().setHours(_horario_inicio.split(":")[0], _horario_inicio.split(":")[1]),
				inicio_raw: _horario_bruto[0],
				final_raw: _horario_bruto[1],
				disciplina: _disciplina,
				turma: $("td:eq(3)", horario_aula).text()
			});
		});

		// Ordena os todos os horários do dia pelo horário de cada aula
		dia.horarios.sort(function(current, next){
			if(current.inicial < next.inicial) return -1;
		    if(current.inicial > next.inicial) return 1;
		    return 0;
		});

		sigabeautifier.dias.push(dia);

		i++;
	});

	$("#TABLE3").remove();

	$("#Grid1ContainerDiv").html(nunjucks.render("disciplinas_list.html", sigabeautifier));
	$("#TABLE2").after(nunjucks.render("horarios_semana_list.html", sigabeautifier));

	$("#Grid1ContainerDiv #Grid1ContainerTbl tr[class^=GridClear]").click(function(){

		var not_reselecting = $(this).hasClass("sigabeautifier-active") == false;

		// Remove classe que destaca linhas da tabela de matérias
		$("#Grid1ContainerDiv #Grid1ContainerTbl tr.sigabeautifier-active").removeClass("sigabeautifier-active");

		// Remove classe que inverte cor de fundo do label
		$("#Grid1ContainerDiv #Grid1ContainerTbl span.sigabeautifier-label-reverse").removeClass("sigabeautifier-label-reverse");

		// Remove classe que destaca linhas das tabelas de horário
		$("#TABLE3 tr.GridClear").removeClass("sigabeautifier-active");

		// Se o item já não estava selecionado
		if (not_reselecting) {

			// Adiciona classe que inverte cor de fundo do label da linha selecionada
			$("span.sigabeautifier-label", $(this)).addClass("sigabeautifier-label-reverse");
			
			// Adiciona classe que destaca linha selecionada
			$(this).addClass("sigabeautifier-active");

			var sigla = $("td:eq(0)", $(this)).text();

			$("#TABLE3 tr.GridClear .sigabeautifier-horario").each(function(i, element) {
				// Destaca linhas das tabelas de horário que forem da mesma disciplina clicada
				if ($(element).text() == sigla) $(element).parents("tr.GridClear").addClass("sigabeautifier-active");
			});

		}

	});



});