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

	$('#MPW0005IMAGE1').css({
		padding: '25px'
	});

	els = {
		user_field: $('#vSIS_USUARIOID'),
		password_field: $('#vSIS_USUARIOSENHA'),
		submit_btn: $('input[type="button"][name="BTCONFIRMA"]:first'),
		gxErrorViewer: $('#gxErrorViewer'),
		help_text: $('#TEXTBLOCK7')[0].outerHTML,
		/*message: $('#TEXTBLOCK3 > div:first')[0].outerHTML,*/
	};

	
	$('#TABLE_MID_MPAGE').hide();

	context = {
		help_text: els.help_text,
		/*message: els.message,*/
		gxErrorViewer: els.gxErrorViewer,
		fake_user_field: $(els.user_field[0].outerHTML).attr({
			'id': 'fake_user_field',
			'name': '',
			'autofocus': 'autofocus',
			'placeholder': 'Usuário',
			'class': 'fake-field form-control'
		})[0].outerHTML,
		fake_password_field: $(els.password_field[0].outerHTML).attr({
			'id': 'fake_password_field',
			'name': '',
			'placeholder': 'Senha',
			'class': 'fake-field form-control'
		})[0].outerHTML,
		fake_submit_btn: $(els.submit_btn[0].outerHTML).attr({
			'id': 'fake_submit_btn',
			'class': 'btn btn-primary btn-block',
			'onclick': '',
			'onfocus': '',
			'name': ''
		})[0].outerHTML,
		fake_gxErrorViewer: $(els.gxErrorViewer[0].outerHTML).attr({
			'id': 'fake_gxErrorViewer',
		})[0].outerHTML,
	};

	var form_invalid = function() {
		$('.form-group').removeClass('has-success').addClass('has-error');
		$('#fake_user_field').focus();
	};

	var form_valid = function() {
		$('.form-group').removeClass('has-error').removeClass('has-error');
	};

	// $('#gxErrorViewer').remove();
	$("#gxErrorViewer").bind("DOMSubtreeModified", function() {
		var error = $(els.gxErrorViewer)[0].innerHTML;
		if (error != '') {
			form_invalid();
	    	$("#fake_gxErrorViewer").html(error);
		} else {
			form_valid();
		}
	});

	$('#TABLE_MASTER_MPAGE').after( nunjucks.render('login_form.html', context) );

	// var body_html = $('#MAINFORM').html();
	// $('#MAINFORM').html( $('div').addClass('wrapper').html(body_html)[0].outerHTML );

	$('#fake_submit_btn').click(function(event){
		event.preventDefault();
		$(els.user_field).val( $('#fake_user_field').val() );
		$(els.password_field).val( $('#fake_password_field').val() );
		$(els.submit_btn).trigger('click');
		return false;
	});

	$('.fake-field').keydown(function(event){
		if ( event.which == 13 ){
			event.preventDefault();
			$('#fake_submit_btn').trigger('click');
			return false;
		}
	});
});