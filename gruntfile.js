module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['<%= pkg.src %>/*.scss', '<%= pkg.components %>/*.scss' ],
                tasks: 'sass'
            },
        },
        sass: {
            dist: {
                options: {
                  style: 'expanded',
                  // nested , compact , compressed , expanded
                  sourcemap: 'auto',
                },
                files: {
                    '<%= pkg.dest %>/css/main.css': '<%= pkg.src %>/main.scss',
                }
            }
        },

        browserSync: {
          bsFiles: {
            src : [
              '<%= pkg.dest %>/css/*.css',
              '<%= pkg.dest %>/js/*.js',
            ]
          },
          options: {
            watchTask: true,
            proxy: "aranca.craft.dev"
          }
        },
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Default task(s).
    grunt.registerTask('default', ['browserSync', 'watch']);

};
