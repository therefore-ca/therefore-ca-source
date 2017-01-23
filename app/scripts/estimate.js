$(document).ready(function () {
  $("#estimate-form").submit(function ($form, event) {
        event.preventDefault();
        var name = $('#estimate-form input#name').val();
        var email = $('#estimate-form input#email').val();
        var comment = $('#estimate-form #comment').val();

        $.ajax({
          url: '/estimate-process',
          data: {
            'name': name,
            'email': email,
            'comment': comment
          }
        }).done(function (response) {
          if (response && !!response.success) {
            $('#estimate-form').html('<div class = "call-to-action col-12"><h1>Your message was sent successfully.</h1><p class = "lead">You will hear back from us shortly!</p></div>')
          } 
        });
      }
    }
  );
});