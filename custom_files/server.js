var _ = require('lodash');
var url = require("url");
var path = require("path");
var fs = require("fs");
var mandrill = require('mandrill-api/mandrill');
var Hapi = require('hapi');
var Good = require('good');

var redirects = require('./redirects');

var mandrill_client = new mandrill.Mandrill('yU1xPprQ1LjIdmsbvqxCaQ');
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
  method: 'POST',
  path: '/contact-process',
  handler: function (request, reply) {
    var args = url.parse(request.url, true).query;
    var message = {
      'from_email': 'contact@therefore.ca',
      'to': [
        {
          'email': 'alex@therefore.ca',
          'name': 'Alex De Winne',
          'type': 'to'
        }
      ],
      'autotext': 'true',
      'subject': 'New Contact Form Submission',
      'html': 'Contact information : <br/>' +
      'Name : ' + args.name + '<br/>' +
      'Email : ' + args.email + '<br/>' +
      'Comment : ' + args.comment + '<br/>'
    };
    mandrill_client.messages.send({"message": message}, function (result) {
      reply({success: true});
    }, function (e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      reply({success: false});
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
