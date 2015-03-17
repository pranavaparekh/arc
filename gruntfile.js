module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['src/sass/site/**/*.scss'],
                tasks: 'sass'
            },
        },
        sass: {
            dist: {
                options: {
                  style: 'expanded',
                  sourcemap: 'auto',
                },
                files: {
                    'public/assets/css/main.css': 'src/sass/site/main.scss'
                }
            }
        },
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'watch']);

};
