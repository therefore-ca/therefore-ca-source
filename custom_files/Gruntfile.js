// Generated on 2015-05-19 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Configurable paths
  var config = {
    dist: '.'
  };
  var mandrill = require('mandrill-api/mandrill');
  var mandrill_client = new mandrill.Mandrill('yU1xPprQ1LjIdmsbvqxCaQ');
   var url = require('url');
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    
  gruntfile: {
    files: ['Gruntfile.js']
  },

    // The actual grunt server settings
    connect: {
      options: {
        port: 80,
        open: true,
        middleware: function (connect, options, middlewares) {
            middlewares.push(function(req, res, next){
                 if(req._parsedUrl.pathname == '/contact-process' ) {                 
                     var args = url.parse(req.url,true).query;
                     var message = {
                        'from_email': 'contact@therefore.ca',
                        'to': [
                        {
                          'email': 'clement@therefore.ca',
                          'name': 'Clément Hurel',
                          'type': 'to'
                        },
                       // {
                       //   'email': 'alex@therefore.ca',
                       //   'name': 'Alex De Winne',
                       //   'type': 'to'
                       // },
                        //{
                        //  'email': 'sean@therefore.ca',
                        //  'name': 'Sean De Rioux',
                        //  'type': 'to'
                        //}
                        ],
                        'autotext': 'true',
                        'subject': 'New Contact Form Submission',
                        'html': 'Contact information : <br/>' +
                        'Name : ' + args.name + '<br/>' +
                        'Email : ' + args.email + '<br/>' +
                        'Comment : ' + args.comment + '<br/>'
                     }
                     mandrill_client.messages.send({"message":message}, function(result) {
                        res.end('done');
                     }, function(e) {
                        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                     });
                    // Set up the request
                  }
                  else {
                    next();
                  }
            });
            middlewares.push(function(req, res, next){
              res.statusCode = '404';
              res.end(grunt.file.read('404.html'));
            });
            middlewares.unshift(function(req, res, next){
                var status = 301;
                 if (req.url == '/blog/accessibility-wcag-aoda-presentation-follow' || req.url == '/blog/accessibility-wcag-aoda-presentation-follow/' ) {
                    res.statusCode = status;
                    res.setHeader('Location', '/accessibility-wcag-aoda-presentation.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/blog/birth-merlin' || req.url == '/blog/birth-merlin/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/birth-of-merlin.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/blog/decoupling-drupal' || req.url == '/blog/decoupling-drupal/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/decoupling-drupal.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/about-us' || req.url == '/about-us/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/about-us.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/mobile-web' || req.url == '/mobile-web/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/meet-the-team' || req.url == '/meet-the-team/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/about-us.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/portfolio' || req.url == '/portfolio/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/blog' || req.url == '/blog/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/#home-blog-teasers');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/contact' || req.url == '/contact/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/contact.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                  else if(req.url == '/brand/loblaws' || req.url == '/brand/loblaws/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                  else if(req.url == '/brand/canada-lands' || req.url == '/brand/canada-lands/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                  else if(req.url == '/portfolio/slide/129/all' || req.url == '/portfolio/slide/129/all') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/portfolio/slide/131/all' || req.url == '/portfolio/slide/131/all/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/portfolio/slide/125/all' || req.url == '/portfolio/slide/125/all/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                  else if(req.url == '/cupw' || req.url == '/cupw/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                  else if(req.url == '/youre-agency' || req.url == '/youre-agency/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/contact.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/brand/allseating' || req.url == '/brand/allseating/' || req.url == '/allseating-website' || req.url == '/allseating-website/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/allseating.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/brand/unifor' || req.url == '/brand/unifor/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/work.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                  else if(req.url == '/sites/default/files/do-the-right-thing-slides.pdf') {
                    res.statusCode = status;
                    res.setHeader('Location', '/do-the-right-thing-slides.pdf');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 else if(req.url == '/website-content-management' || req.url == '/website-content-management/') {
                    res.statusCode = status;
                    res.setHeader('Location', '/services.html');
                    res.setHeader('Content-Length', '0');
                    res.end();
                 }
                 next();
              });

            return middlewares;
          },
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
        }
      }
    }
  });


grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
  
    return grunt.task.run(['connect:dist:keepalive']);

});


};
