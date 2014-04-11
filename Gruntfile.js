module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          'dist/support.directive.js': 'lib/support.directive.coffee'
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

  grunt.registerTask('build', ['coffee', 'uglify']);
};