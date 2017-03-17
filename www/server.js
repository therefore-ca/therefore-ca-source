var _ = require('lodash');
var url = require("url");
var path = require("path");
var fs = require("fs");
var Hapi = require('hapi');
var Good = require('good');
var nodemailer = require('nodemailer');

var redirects = require('./redirects');

var smtpConfig = {
  host: 'mail-manager.smtp.com',
  port: 25,
  secure: false, // use SSL
  auth: {
    user: 'alexd@therefore.ca',
    pass: '9bacf2ae'
  }
};
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

server.route({
  method: 'GET',
  path: '/contact-process',
  handler: function (request, reply) {
    var args = url.parse(request.url, true).query;

    // If blank values for any of the required fields somehow made it through, it's likely this wasn't submitted through
    // the form, and should be rejected. The site validates that all of these must be present before sumbmitting over
    // ajax.
    if (!args.name || !args.email || !args.tel || !args.comment) {
      return reply({success: false});
    }

    var htmlContent = '<h3>Contact information</h3>' +
      '<b>Name</b><br>' + args.name + '<br><br>' +
      '<b>Email</b><br>' + args.email + '<br><br>' +
      '<b>Phone number</b><br>' + args.tel + '<br><br>' +
      '<b>Comment</b><br>' + args.comment + '<br>';

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
      reply({success: success});
    });
  }
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

    // If blank values for any of the required fields somehow made it through, it's likely this wasn't submitted through
    // the form, and should be rejected. The site validates that all of these must be present before sumbmitting over
    // ajax.
    if (!args.name || !args.email || !args.tel || !args.projectTimeline || !args.projectDetails || !args.estimatedBudget) {
      result.errorMessage = "Opps, it looks like you missed entering a field. Please ensure to enter all your details so we can provide you the best estimate as possible.";
      return reply(result);
    }
    // If the budget amount is invalid, flag the error
    var cleanNumber = parseInt(args.estimatedBudget.replace(new RegExp('[\$\,\.]','gm'), ''));
    if (!_.isNumber(cleanNumber) || _.isNaN(cleanNumber) || cleanNumber <= 0) {
      result.errorMessage = "Please enter a positive numerical budget amount.";
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

    var requestObject = {
      to: 'hello@therefore.ca',
      from: 'hello@therefore.ca',
      subject: 'therefore.ca - Project Estimate Form Submission',
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
      reply({success: success});
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
