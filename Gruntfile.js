/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    clean: {
        dist: ["dist/"]
    },

    copy: {
        dist: {
              files: [
                  {expand: true, cwd:'app/', src: ['*.json'], dest: 'dist/unpacked'},
                  {expand: true, cwd:'app/', src: ['_locales/**'], dest: 'dist/unpacked'},
                  {expand: true, cwd:'app/', src: ['images/**'], dest: 'dist/unpacked'},
                  {expand: true, cwd:'app/', src: ['html/**'], dest: 'dist/unpacked'},
                  {expand: true, cwd:'app/', src: ['style/**'], dest: 'dist/unpacked'}
              ]
        }
    },
    uglify: {
          dist: {
              files: {
                  'dist/unpacked/scripts/background.js': ['app/scripts/background/*.js']
              }
          }
    },
    concat: {
       dist: {
           files: {
               'dist/unpacked/scripts/main.js' : ['app/scripts/popup.js']
           }
       }
    },

    // Compres dist files to package
    compress: {
        dist: {
            options: {
                archive: function() {
                    var manifest = grunt.file.readJSON('app/manifest.json');
                    return 'dist/package/freeBoerse-' + manifest.version + '.zip';
                }
            },
            files: [{
                expand: true,
                cwd: 'dist/unpacked/',
                src: ['**'],
                dest: ''
            }]
        }
    },

    watch: {
          files: ['app/**/*'],
          tasks: ['dist']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');


  grunt.registerTask('dist', ['clean', 'uglify', 'concat', 'copy', 'compress']);
};
