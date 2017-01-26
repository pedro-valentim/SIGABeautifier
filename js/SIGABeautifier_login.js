$(function(){

	/*
		- usuario
		$('#vSIS_USUARIOID')

		- senha
		$('#vSIS_USUARIOSENHA')

		- help text
		$('#TEXTBLOCK7')

		- prezado aluno...
		$('#TEXTBLOCK3 > div:first')


		$('#TABLE_MID_MPAGE').remove();
	*/

	$.fn.startTag = function(){
		return this[0].outerHTML.split(this.html())[0];
	};

	_html = {
		user_field: $('#vSIS_USUARIOID')[0].outerHTML,
		password_field: $('#vSIS_USUARIOSENHA')[0].outerHTML,
		gxstate_field: $('input[type="hidden"][name="GXState"]')[0].outerHTML,
		gxErrorViewer: $('#gxErrorViewer')[0].outerHTML,
		submit_btn: $('input[type="button"][name="BTCONFIRMA"]')[0].outerHTML,
		help_text: $('#TEXTBLOCK7')[0].outerHTML,
		message: $('#TEXTBLOCK3 > div:first')[0].outerHTML,
	};

	$('#gxErrorViewer').remove();
	$('input[type="hidden"][name="GXState"]').remove();

	_html.user_field = $(_html.user_field).attr('class', 'form-control').attr('placeholder', 'Usuário')[0].outerHTML
	_html.password_field = $(_html.password_field).attr('class', 'form-control').attr('placeholder', 'Senha')[0].outerHTML
	_html.submit_btn = $(_html.submit_btn).attr('class', 'btn btn-primary btn-block')[0].outerHTML

	$('#TABLE_MID_MPAGE').remove();

	$('#MPW0005IMAGE1').css({
		padding: '25px'
	});

	context = {
		form: {
			user: _html.user_field,
			gxstate: _html.gxstate_field,
			password: _html.password_field,
			submit_btn: _html.submit_btn,
			meta: {
				id: $('#MAINFORM').attr('id'),
				action: $('#MAINFORM').attr('action'),
				onsubmit: $('#MAINFORM').attr('onsubmit'),
				name: $('#MAINFORM').attr('name'),
				method: $('#MAINFORM').attr('method'),
			},
		},
		help_text: _html.help_text,
		message: _html.message,
		gxErrorViewer: _html.gxErrorViewer,
	};

	mainform_html = $('#MAINFORM').html();
	$('#MAINFORM').after(mainform_html);
	$('#MAINFORM').remove();

	$('#TABLE_MASTER_MPAGE').after( nunjucks.render('login_form.html', context) );

});