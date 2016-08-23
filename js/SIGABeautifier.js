var sigabeautifier = {
	user: {}
};
$(function() {

	// send message to background script
    chrome.runtime.sendMessage({ "newIconPath" : '../img/icon-active.png' });

	$("#TABLE100_MPAGE").attr('cellspacing', 25);

	sigabeautifier.user.nome = $("#span_MPW0039vPRO_PESSOALNOME").text().trim();
	var nome_split = sigabeautifier.user.nome.toLowerCase().split(" ");
	sigabeautifier.user.nomecurto = nome_split[0].charAt(0).toUpperCase() + nome_split[0].slice(1) + " " + nome_split[1].charAt(0).toUpperCase() + nome_split[1].slice(1);
	sigabeautifier.user.avatar = $("#MPW0039FOTO > img").attr('src');
	sigabeautifier.user.ra = $("#span_MPW0039vACD_ALUNOCURSOREGISTROACADEMICOCURSO").text().trim();
	sigabeautifier.user.mediacurso = $("#span_MPW0039vACD_ALUNOCURSOINDICEPR").text().trim();
	sigabeautifier.user.progressao = $("#span_MPW0039vACD_ALUNOCURSOINDICEPP").text().trim();
	sigabeautifier.user.maiormediacurso = $("#span_MPW0039vMAX_ACD_ALUNOCURSOINDICEPR").text().trim();
	sigabeautifier.user.curso = $("#span_vACD_CURSONOME_MPAGE").text().trim();
	sigabeautifier.user.periodo = $("#span_vACD_PERIODODESCRICAO_MPAGE").text().trim();

	var url = chrome.extension.getURL("html/templates/user-info-card.html");
	$.get(url, function(data, textStatus, jqXHR){
		var template = object_in_template(sigabeautifier.user, data);
		$("#gxHTMLWrpMPW0039").html(template);
	}, "html");

});

function object_in_template(object, template_html) {
	var template = template_html;
	for (attribute in object) {
		template = object_attr_in_template(attribute, object[attribute], template);
	}
	return template;
}

function object_attr_in_template(object_attr_name, object_attr_value, template_html) {
	return template_html.replace(new RegExp("{{[\s+]?" + object_attr_name + "[\s+]?}}", "g"), object_attr_value);
}