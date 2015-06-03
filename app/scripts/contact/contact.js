
$( document ).ready(function() {
	 $("#contact-form").submit(function(event){ 
        event.preventDefault(); 
    }); 
	$("input,textarea").jqBootstrapValidation(
		{
            preventSubmit: true,
            submitError: function($form, event, errors) {
                // Here I do nothing, but you could do something like display 
                // the error messages to the user, log, etc.
            },
            submitSuccess: function($form, event) {
                event.preventDefault();
                var name = $('#contact-form input#name').val();
                var email = $('#contact-form input#email').val();
                var comment = $('#contact-form #comment').val();
				$.ajax({
				  type: 'POST',
				  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				  data: {
				    'key': 'yU1xPprQ1LjIdmsbvqxCaQ',
				    'message': {
				      'from_email': 'contact@therefore.ca',
				      'to': [
				          {
				            'email': 'clement@therefore.ca',
				            'name': 'Clément Hurel',
				            'type': 'to'
				          },
				          {
				            'email': 'alex@therefore.ca',
				            'name': 'Alex De Winne',
				            'type': 'to'
				          },
				           {
				            'email': 'sean@therefore.ca',
				            'name': 'Sean De Rioux',
				            'type': 'to'
				          }
				        ],
				      'autotext': 'true',
				      'subject': 'New Contact Form Submission',
				      'html': 'Here the information : <br/>' +
				       'Name : ' + name + '<br/>' +
				       'Email : ' + email + '<br/>' +
				       'Comment : ' + comment + '<br/>'
				    }
				  }
				 }).done(function(response) {
				 	$('#contact-calltoaction .inner.container').html('<div class = "call-to-action col-12"><h2>Thanks you for contacting <span class = "underline">us</span></h2></div>')
				   //console.log(response); // if you're into that sorta thing
				 });
            },
        }
     ); 
});