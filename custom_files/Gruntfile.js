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
        port: 8080,
        open: true,
        middleware: function (connect, options, middlewares) {
            middlewares.unshift(function(req, res, next){
                var status = 302;
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
