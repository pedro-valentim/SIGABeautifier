var sigabeautifier = {
	user: {},
	sections: []
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

	// Atualiza painel de info do user
	url = chrome.extension.getURL("html/templates/user-info-card.html");
	$.get(url, function(data, textStatus, jqXHR){
		var template = object_in_template(sigabeautifier.user, data);
		$("#gxHTMLWrpMPW0039").html(template);
	}, "html");

	// Atualiza menu lateral
	url = chrome.extension.getURL("html/templates/sidemenu.html");
	$.get(url, function(sidemenu_html, textStatus, jqXHR){
		var sidemenu = $(sidemenu_html);
		var sidemenu_sections = [];
		url = chrome.extension.getURL("html/templates/sidemenu_section.html");
		$.get(url, function(sidemenu_section_html, textStatus, jqXHR){
			// Para cada seção do menu lateral...
			$("#MPTREEVIEW1Container #ygtvc1 > .ygtvitem").each(function() {
				
				var secao_nome = $('> table .BasicNodeTextDecoration .NodeTextDecoration', $(this)).text();
				sidemenu_sections.push(
					object_in_template(sigabeautifier.user, sidemenu_section_html)
				);
				// Para cada item na seção no menu
				$('.ygtvchildren .ygtvitem', $(this)).each(function(){
					var item_nome = $('> table .BasicNodeTextDecoration .NodeTextDecoration', $(this)).text();
					var link = $('> table .BasicNodeTextDecoration', $(this));
					var href = link.attr('href');
					var target = link.attr('style');
				});
			});
		});
		
		$("#gxHTMLWrpMPW0039").html(sidemenu);
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