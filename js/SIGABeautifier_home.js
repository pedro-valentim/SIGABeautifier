$(function(){

	sigabeautifier.prazos = {
		integralizacao_min_num: parseInt($("#span_vACD_ALUNOCURSOPRAZOINTEGRALIZACAOMIN").text().trim()),
		integralizacao_max_num: parseInt($("#span_vACD_ALUNOCURSOPRAZOINTEGRALIZACAOMAX").text().trim()),
		semestres_cursados_num: parseInt($("#span_vACD_ALUNOCURSOSEMESTRESEFETIVAMENTECURSADOS").text().trim()),
		situacao: $("#span_vSITUACAO").text().trim(),
		integralizacao_extra_num: 0,
		integralizacao_extra: 0,
		concluido_mensagem: ""
	};

	sigabeautifier.prazos.integralizacao_min = sigabeautifier.prazos.integralizacao_min_num * 100 / sigabeautifier.prazos.integralizacao_max_num;
	sigabeautifier.prazos.integralizacao_max = 100 - sigabeautifier.prazos.integralizacao_min;
	sigabeautifier.prazos.semestres_cursados = sigabeautifier.prazos.semestres_cursados_num * 100 / sigabeautifier.prazos.integralizacao_max_num;
	sigabeautifier.prazos.semestres_nao_cursados = 100 - sigabeautifier.prazos.semestres_cursados;
	sigabeautifier.prazos.semestres_nao_cursados_num = sigabeautifier.prazos.integralizacao_max_num - sigabeautifier.prazos.semestres_cursados_num;
	sigabeautifier.prazos.concluido = sigabeautifier.prazos.semestres_nao_cursados_num == 0;
	if (sigabeautifier.prazos.concluido) {
		sigabeautifier.prazos.concluido_mensagem = "Todos os semestres cursados! <strong>Parabéns!</strong>";
	}

	if (sigabeautifier.prazos.semestres_cursados_num > sigabeautifier.prazos.integralizacao_min_num) {
		sigabeautifier.prazos.nao_cursado_css_class = "danger-light";
	}


	$("#GROUP1 legend.GroupTitleTitle").css({
		fontFamily: "Helvetica",
		fontWweight: 100,
    	fontSize: "16pt"
	});
	
	$("#TABLE1").before( nunjucks.render('progressbar-deadlines.html', sigabeautifier) );
	$("#TABLE1").hide();

});