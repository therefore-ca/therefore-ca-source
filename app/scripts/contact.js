$(document).ready(function () {
  var $contactForm = $("#contact-form");
  $contactForm.submit(function (event) {
    event.preventDefault();
  });
  $contactForm.find("input,textarea").jqBootstrapValidation(
    {
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // Here I do nothing, but you could do something like display
        // the error messages to the user, log, etc.
      },
      submitSuccess: function ($form, event) {
        event.preventDefault();
        var formError = $("#form-error .errorNotice");
        formError.text(' ');

        var name = $contactForm.find('input#name').val();
        var email = $contactForm.find('input#email').val();
        var tel = $contactForm.find('input#tel').val();
        var comment = $contactForm.find('#comment').val();

        $.ajax({
          url: '/contact-process',
          method: 'GET',
          data: {
            'name': name,
            'email': email,
            'tel': tel,
            'comment': comment
          }
        }).done(function (response) {
          if (response && !!response.success) {
            $('#contact-calltoaction .inner.container').html('<div class = "call-to-action col-12"><h1>Thank you for contacting us</h1><p class = "lead">Someone will be in touch shortly!</p></div>')
          } else {
            formError.text("There was an error submitting your request. Please try again.");
          }
        });
      }
    }
  );

  var $estimateForm = $("#estimate-form");
  $estimateForm.submit(function (event) {
    event.preventDefault();
  });
  $estimateForm.find("input,textarea").jqBootstrapValidation(
    {
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // Here I do nothing, but you could do something like display
        // the error messages to the user, log, etc.
      },
      submitSuccess: function ($form, event) {
        event.preventDefault();
        var formError = $("#form-error .errorNotice");
        formError.text('');

        var name = $estimateForm.find('input#firstName').val() + ' ' + $estimateForm.find('input#lastName').val();
        var email = $estimateForm.find('input#email').val();
        var tel = $estimateForm.find('input#tel').val();
        var projectDetails = $estimateForm.find('#projectDetails').val();
        var estimatedBudget = $estimateForm.find('#estimatedBudget').val();
        var projectTimeline = $estimateForm.find('#projectTimeline').val();

        $.ajax({
          url: '/estimate-process',
          method: 'GET',
          data: {
            'name': name,
            'email': email,
            'tel': tel,
            'projectDetails': projectDetails,
            'estimatedBudget': estimatedBudget,
            'projectTimeline': projectTimeline,
          }
        }).done(function (response) {
          if (response && !!response.success) {
            var cta = $('#estimate-calltoaction');
            cta.html('<div class = "call-to-action col-12"><h1>Your message was sent successfully.</h1><p class = "lead">You will hear back from us shortly!</p></div>');

            $('html,body').scrollTo(cta, {
              axis: 'y',
              duration: 800,
              offset: -50,
              interrupt: true
            });
          } else {
            formError.text(response.errorMessage || "There was an error submitting your request. Please try again.");
          }
        });
      }
    }
  );
});
