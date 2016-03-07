var _ = require('lodash');
var url = require("url");
var path = require("path");
var fs = require("fs");
var Hapi = require('hapi');
var Good = require('good');

var redirects = require('./redirects');

var SparkPost = require('sparkpost');
var smptClient = new SparkPost('cf7bf3520f542bf8f9e0a17d52538ad7ec7fec76', {
  // endpoint: 'https://dev.sparkpost.com:443' // for development testing
});


var server = new Hapi.Server();

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
    if(!args.name || !args.email || !args.comment) {
      return reply({success: false});
    }

    var htmlContent = '<h3>Contact information</h3>' +
      '<b>Name</b><br>' + args.name + '<br><br>' +
      '<b>Email</b><br>' + args.email + '<br><br>' +
      '<b>Comment</b><br>' + args.comment + '<br>';

    var requestObject = {
      description: 'therefore.ca - Contact submission from ' + args.name + '<' + args.email + '>',
      recipients: [
        {
          address: {
            email: 'hello@therefore.ca'
          }
        },
        // {
        //   address: {
        //     email: 'homer@therefore.ca',
        //     name: 'Homer'
        //   }
        // }
      ],
      content: {
        subject: 'therefore.ca - New Contact Form Submission',
        from: {
          email: 'hello@therefore.ca'
        },
        html: htmlContent
      },
      options: {
        "open_tracking": true
      }
    };

    console.log('Email -- Attempting to send',requestObject);

    smptClient.transmissions.send({transmissionBody:requestObject}, function (err, r) {
      var success = false;
      var body = r && r.body ? r.body : {};
      var results = body.results || {};

      console.log('Email -- Result',body);

      if (err) {
        console.log('Email -- Error', err);
      } else if (results.total_accepted_recipients > 0) {
        success = true;
      }

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
