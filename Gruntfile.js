module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          'dist/support.directive.js': 'lib/support.directive.coffee'
        }
      }
    },
    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: {
          'dist/support.directive.css': 'lib/support.directive.styl'
        }
      }
    },
    uglify: {
      angular: {
        src: 'dist/support.directive.js',
        dest: 'dist/support.directive.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('build', ['coffee', 'stylus', 'uglify']);
};