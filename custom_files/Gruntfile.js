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
