//Gruntfile.js
module.exports = function (grunt) {
  grunt.initConfig({

    // Watch task config
    watch: {
      sass: {
        files: "scss/*.scss",
        tasks: ['sass']
      },
      cssmin: {
        files: ["css/*.css","!css/*.min.css"],
        tasks: ['cssmin']
      },
      uglify: {
       files: ["js/*.js", "!js/*.min.js"],
       tasks: ['uglify']
     },
     imagemin: {
      files: ['img/*.{png,jpg,gif,svg}'],
      tasks: ['newer:imagemin'], //use newer here
      options: {
        spawn: false,
      }
    }
  },
    // Sass task config
    sass: {
        dev: {
            files: {
                // fichero destino  // fichero .scss
                "css/custom.css" : "scss/custom.scss"
            }
        }
    },
    // Usamos BrowserSync para tus archivos .html, .css, etc, estáticos.
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "css/*.css",
            "js/*.js",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
           }
          }
        }
      },

      // UnCSS task config
      uncss: {
          dist: {
              options: {
                 //Estilos que queremos limpiar
                 stylesheets : ['css/materialize.min.css'],

                 //Estilos que no queremos limpiar
                 ignoreSheets: [/custom.css/],
              },
              files: {
                      //Archivo css de salida    //Scanea las clases, ids, etc de este html
                      'css/materialize.min.css': ['index.html']
              }
          }
      },
      // Cssmin task config
      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: {//Fichero combinado   //Ficheros que vamos a combinar, 2 .css
                  'css/allcss.min.css': ['css/custom.css', 'css/materialize.min.css']
          }
        }
      },
      //Uglify task config (JS compress)
      uglify: {
        build: {
          src: 'js/custom.js',//Ruta de fichero de entrada
          dest: 'js/custom.min.js'//Ruta del fichero minificado
        }
      },
      //Imagemin task config
      imagemin: {
          main: {
            files: [{
              expand: true,
              cwd: 'img/', //todas las imágenes de esta ruta
              src: ['**/*.{png,jpg,gif,.svg}'], //patrón de tipos de imagen
              dest: 'img/' //carpeta destino una vez optimizadas
            }]
          }
       }

    });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

 //Tarea por defecto
 grunt.registerTask('default', ['browserSync', 'watch']);
};
