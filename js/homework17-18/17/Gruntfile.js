module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: 'src/js/*.js',
        dest: 'build/js/script.js'
      }
    },
    
    uglify: {
      build: {
        src: 'build/js/script.js',
        dest: 'build/js/script.min.js'
      }
    },
    
    concat_css: {
      options: {},
      all: {
        src: 'src/css/*.css',
        dest: 'build/css/style.css'
      }
    },
    
    cssmin: {
      my_target: {
        src: 'build/css/style.css',
        dest: 'build/css/style.min.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-css');
  grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin']);

};