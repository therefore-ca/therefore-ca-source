var _ = require('lodash');
var url = require("url");
var path = require("path");
var fs = require("fs");
var Hapi = require('hapi');
var Good = require('good');
var nodemailer = require('nodemailer');
var yup = require('yup');

var redirects = require('./redirects');

var smtpConfig = {
  host: process.env.SMTP_HOST,
  port: 25,
  secure: false, // use SSL
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
console.log('smptConfig', smtpConfig);
var transporter = nodemailer.createTransport(smtpConfig);


// Handle possible cookies coming in from the blog node server; reject them at all costs
var serverConfig = {
  connections: {
    routes: {
      state: {
        //parse: false,
        failAction: 'ignore'
      }
    }
  }
};

var server = new Hapi.Server(serverConfig);

server.connection({
  routes: {
    files: {
      relativeTo: process.cwd()
    }
  },
  port: 8888
});

function sendMailer(htmlContent, reply) {
  var requestObject = {
    to: 'hello@therefore.ca',
    from: 'hello@therefore.ca',
    subject: 'therefore.ca - New Contact Form Submission',
    text: htmlContent,
    html: htmlContent
  };

  console.log('Email -- Attempting to send', requestObject);

  // send mail with defined transport object
  transporter.sendMail(requestObject, function (error, info) {
    var success = false;

    if (error) {
      return console.log(error);
    } else {
      success = true;
    }
    console.log('Message sent: ' + info.response);

    return reply({ success: success });
  });
}

server.route({
  method: 'GET',
  handler: function (request, reply) {
    var args = url.parse(request.url, true).query;

    args.comment = _.escape(args.comment);

    var schema = yup.object().shape({
      name: yup.string().required(),
      tel: yup
        .string()
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
          message: 'Please enter a valid phone number (i.e. 416-111-1111)',
        })
        .required(),
      age: yup
        .number()
        .required()
        .positive()
        .integer(),
      email: yup
        .string()
        .email()
        .required(),
      website: yup.string().url(),
      comment: yup.string().required(),
    });

    schema.validate(args).catch(function(err) {
      // err.name; // => 'ValidationError'
      // err.errors; // => ['Deve ser maior que 18']
      var result = {
        errorMessage: '',
        success: !(err && err.errors && err.errors.length > 0),
      };

      if(!result.success) {
        result.errorMessage = err.errors.join(', ');
        return reply(result);
      }

      var htmlContent = '<h3>Contact information</h3>' +
        '<b>Name</b><br>' + args.name + '<br><br>' +
        '<b>Email</b><br>' + args.email + '<br><br>' +
        '<b>Phone number</b><br>' + args.tel + '<br><br>' +
        '<b>Comment</b><br>' + args.comment + '<br>';

      sendMailer(htmlContent, reply);
    });
  },
  path: '/contact-process'
});

server.route({
  method: 'GET',
  path: '/estimate-process',
  handler: function (request, reply) {
    var args = url.parse(request.url, true).query;
    var result = {
      success: false,
      errorMessage: ''
    };

    args.comment = _.escape(args.comment);
    // If the budget amount is invalid, flag the error
    args.estimatedBudget = parseInt(args.estimatedBudget.replace(new RegExp('[\$\,\.]','gm'), ''));

    var schema = yup.object().shape({
      name: yup.string().required(),
      tel: yup
        .string()
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
          message: 'Please enter a valid phone number (i.e. 416-111-1111)',
        })
        .required(),
      email: yup
        .string()
        .email()
        .required(),
      projectTimeline: yup.string().required(),
      projectDetails: yup.string().required(),
      estimatedBudget: yup
        .number()
        .required()
        .positive()
        .integer(),
    });

    schema.validate(args).catch(function(err) {
      // err.name; // => 'ValidationError'
      // err.errors; // => ['Deve ser maior que 18']
      var result = {
        errorMessage: '',
        success: !(err && err.errors && err.errors.length > 0),
      };

      if(!result.success) {
        result.errorMessage = err.errors.join(', ');
        return reply(result);
      }


      var htmlContent = '<h3>Contact information</h3>' +
        '<b>Name</b><br>' + args.name + '<br><br>' +
        '<b>Email</b><br>' + args.email + '<br><br>' +
        '<b>Phone number</b><br>' + args.tel + '<br><br>' +
        '<h3>Project</h3><b>Details</b><br>' + args.projectDetails + '<br><br>' +
        '<b>Estimated Budget</b><br>' + args.estimatedBudget + '<br><br>' +
        '<b>Timeline</b><br>' + args.projectTimeline + '<br><br>'
      ;

      sendMailer(htmlContent, reply);
    });
  }
});


server.register(require('inert'), function (err) {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/{uri*}',
    handler: function (request, reply) {
      var uri = request.params.uri;
      server.log('info', 'uri = ' + uri);

      if (fs.existsSync(uri)) {
        reply.file(uri);
      } else if (fs.existsSync(uri + '.html')) {
        reply.file(uri + '.html');
      }
      else if (redirects['/' + uri]) {
        reply.redirect(redirects['/' + uri]);
      } else {
        reply.file('404.html');
      }
    }
  });
});

server.register({
  register: Good,
  options: {
    reporters: [
      {
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*'
        }
      }
    ]
  }
}, function (err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
