$(document).ready(function () {
  $("#estimate-form").submit(function (event) {
    event.preventDefault();
  });
  $("input,textarea").jqBootstrapValidation(
    {
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // Here I do nothing, but you could do something like display
        // the error messages to the user, log, etc.
      },
      submitSuccess: function ($form, event) {
        event.preventDefault();
        var name = $('#estimate input#name').val();
        var email = $('#estimate input#email').val();
        var comment = $('#estimate #comment').val();

        $.ajax({
          url: '/estimate-process',
          data: {
            'name': name,
            'email': email,
            'comment': comment
          }
        }).done(function (response) {
          if (response && !!response.success) {
            $('#contact-calltoaction .inner.container').html('<div class = "call-to-action col-12"><h1>Your message was sent successfully.</h1><p class = "lead">You will hear back from us shortly!</p></div>')
          } else {
            formError.text("There was an error submitting your request. Please try again.");
          }
        });
      }
    }
  );
});