module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
              files: ['src/sass/site/**/*.scss'],
              tasks: 'sass'
            },
            concat: {
              files: ['<%= pkg.dest %>/js/*.js'],
              tasks: 'concat'
            },
            options: {
              livereload: {
                port: 9000,
              }
            },
        },

        concat: {
          options: {
            separator: ';'
          },
          dist: {
            src: [ '<%= pkg.dest %>js/jquery.js','<%= pkg.dest %>js/naturalscroll.js','<%= pkg.dest %>js/main.js'],
            dest: '<%= pkg.dest %>js/aranca-cn.js'
          }
        },

        uglify: {
          dist: {
            files: {
              'public/assets/js/aranca-cn.min.js': ['<%= concat.dist.dest %>']
            }
          }
        },

        sass: {
            dist: {
                options: {
                  style: 'compressed',
                  // nested , compact , compressed , expanded
                  sourcemap: 'auto',
                },
                files: {
                  'public/assets/css/main.css': 'src/sass/site/main.scss',
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
            proxy: "aranca.ci.dev"
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
