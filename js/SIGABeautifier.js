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
			var id_sufix = 1;
			// Para cada seção do menu lateral...
			$("#MPTREEVIEW1Container #ygtvc1 > .ygtvitem").each(function(i, ygtvitem) {
				
				var section = {};
				section.secao_nome = $("> table .BasicNodeTextDecoration .NodeTextDecoration", $(this)).text();
				section.secao_id = "MenuLateralSecao_" + $("> table .BasicNodeTextDecoration .NodeTextDecoration", $(this)).text() + id_sufix;
				section.active_class = "";
				if (section.secao_nome=='Consultas') section.active_class = "active";

				var sidemenu_section = $(object_in_template(section, sidemenu_section_html));
				sidemenu_section.click(function(){
					$(this).toggleClass('active');
				});
				
				// Para cada item na seção no menu
				$(".ygtvchildren .ygtvitem", $(this)).each(function(){
					var item_nome = $("> table .BasicNodeTextDecoration .NodeTextDecoration", $(this)).text();
					var link = $("> table .BasicNodeTextDecoration", $(this));

					var link_element = $("<a />").text(item_nome)
											.attr("href", link.attr("href"))
											.attr("target", link.attr("target"));

					$("ul", sidemenu_section).append(
						$("<li />")
							.html( link_element )
					);
				});

				$("#menu-content", sidemenu).append( sidemenu_section );
				id_sufix = id_sufix + 1;
			});
			$("#MPTREEVIEW1Container").html(sidemenu);
		});
	}, "html");

	// Remove borda de table wrapper do menu lateral
	$("#TABLE2_MPAGE").css('border', 0);

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