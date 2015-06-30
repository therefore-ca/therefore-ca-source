
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
        url:'/contact-process',
        data: {
            'name' : name,
            'email' : email,
            'comment': comment
          }
        }).done(function(response) {
          $('#contact-calltoaction .inner.container').html('<div class = "call-to-action col-12"><h1>Thank you for contacting us</h1><p class = "lead">Someone will be in touch shortly!</p></div>')
          
        });
      },
    }
  ); 
});