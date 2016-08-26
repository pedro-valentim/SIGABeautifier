var sigabeautifier = {
	user: {},
	sections: []
};
$(function() {

	// send message to background script
    chrome.runtime.sendMessage({ "newIconPath" : '../img/icon-active.png' });

    sigabeautifier.user.autenticado = $("#span_MPW0039vPRO_PESSOALNOME") != null;

    nunjucks.configure(chrome.extension.getURL("html/templates"), { autoescape: true });

	// Se algo der errado aqui mostrar body de qualquer forma (finally)
    try {

    	$("#TABLE100_MPAGE").attr('cellspacing', 25);

    	if (sigabeautifier.user.autenticado) {

    		sigabeautifier.user.nome = $("#span_MPW0039vPRO_PESSOALNOME").text().trim();

			nome_split = sigabeautifier.user.nome.toLowerCase().split(" ");

			sigabeautifier.user.nomecurto = nome_split[0].charAt(0).toUpperCase() + nome_split[0].slice(1) + " " + nome_split[1].charAt(0).toUpperCase() + nome_split[1].slice(1);
			sigabeautifier.user.avatar = $("#MPW0039FOTO > img").attr('src');
			sigabeautifier.user.ra = $("#span_MPW0039vACD_ALUNOCURSOREGISTROACADEMICOCURSO").text().trim();
			sigabeautifier.user.mediacurso = $("#span_MPW0039vACD_ALUNOCURSOINDICEPR").text().trim();
			sigabeautifier.user.progressao = $("#span_MPW0039vACD_ALUNOCURSOINDICEPP").text().trim();
			sigabeautifier.user.maiormediacurso = $("#span_MPW0039vMAX_ACD_ALUNOCURSOINDICEPR").text().trim();
			sigabeautifier.user.curso = $("#span_vACD_CURSONOME_MPAGE").text().trim();
			sigabeautifier.user.periodo = $("#span_vACD_PERIODODESCRICAO_MPAGE").text().trim();

			// Atualiza info do user (acima do menu lateral)
			$("#gxHTMLWrpMPW0039").html( nunjucks.render('user-info-card.html', sigabeautifier.user) );

			var id_prefix = "MenuLateralSecao_";

			// Para cada seção do menu lateral...
			$("#MPTREEVIEW1Container #ygtvc1 > .ygtvitem").each(function(i, ygtvitem) {
				
				var section = {};

				section.nome = $("> table .BasicNodeTextDecoration .NodeTextDecoration", $(this)).text();
				section.id = id_prefix + section.nome;
				section.css_class = "";
				section.fa_icon = "circle";
				section.items = [];

				// Para cada item na seção no menu
				$(".ygtvchildren .ygtvitem", $(this)).each(function(){
					var link = $("> table .BasicNodeTextDecoration", $(this));

					section.items.push({
						href: link.attr("href"),
						target: link.attr("target"),
						nome: $(".NodeTextDecoration", link).text()
					});

				});

				sigabeautifier.sections.push( section );

			});

			// Filtra as seções pela url do link do seus items e a url da página
			// e.g.: página: /aluno/horario.aspx, active_section = Consultas
			var active_section = sigabeautifier.sections.filter(function(_section) {
				var bool = false;
				$.each(_section.items, function(i, _section_item) {
					if ("/aluno/" + _section_item.href == window.location.pathname) {
						_section_item.css_class = "highlight";
						bool = true;
					}
				});
				return bool;
			})[0];

			active_section.css_class = "active";

			var sidemenu = $(nunjucks.render('sidemenu.html', sigabeautifier));

			$("#TABLE2_MPAGE").before( sidemenu );
			$("#TABLE2_MPAGE").remove();

		}

		// Ao clicar na seção mostra/esconde itens da seção
		$(document).on("click", "#menu-content > li", function(event){
			$(this).toggleClass("active");
		});

		// Impede que o click no item da seção do menu chame o click na seção
		$(document).on("click", "#menu-content .sub-menu > li", function(event){
			event.stopPropagation();
		});

		// Remove borda de table wrapper do menu lateral
		$("#TABLE2_MPAGE").css('border', 0);
	}
	catch(err) {
		window.console.error(err);
	} 
	finally {
	    $("body").fadeIn("slow");
	}


});
