'use strict';

// livereload用の初期設定
var path = require('path'),
    lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
    folderMount = function folderMount(connect, point) {
        return connect.static(path.resolve(point));
    };

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    connect: {
        server: {
            options: {
                port: 9001,
                middleware: function(connect, options) {
                    return [lrSnippet, folderMount(connect, '.')];
                }
            }
        }
    },
    watch: {
      sass: {
        files: ['source_css/style.scss'],
        tasks: ['compass', 'cmq', 'csscomb', 'cssmin'],
        options: {
            livereload: true,
            nospawn: true
        }
      },
      js: {
        files: ['source_js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            livereload: true,
            nospawn: true
        }
      },
      html: {
        files: ['./*.html'],
        tasks: [],
        options: {
            livereload: true,
            nospawn: true
        }
      }
    },
    // バラバラに記述されたメディアクエリをまとめる
    cmq:{
      options: {
        log: false
      },
      dev: {
        files: {
            'css/': ['css/style.css']
        }
      }
    },
    // csscombでCSSプロパティを揃える
    csscomb:{
      dev:{
        expand: true,
        cwd: 'css/',
        src: ['*.css'],
        dest: 'css/'
      }
    },
    // css minify
    cssmin: {
      build: {
        files: {
          'css/style.min.css' : 'css/style.css'
        }
      }
    },
    // ファイル結合の設定
    concat: {
      dist: {
        src: [
          'source_js/jquery.js',
          'source_js/user.js',
        ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },

    // ファイル圧縮の設定
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    }
  });

  var taskName;
  // GruntFile.jsに記載されているパッケージを自動読み込み
  for(taskName in grunt.file.readJSON('package.json').devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }

  // デフォルトタスクの設定
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', ['concat', 'uglify' ]);
  grunt.registerTask('eatwarnings', function() {
    grunt.warn = grunt.fail.warn = function(warning) {
      grunt.log.error(warning);
    };
  });
   
};