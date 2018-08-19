module.exports = function(grunt) {
	var gc = {
		fontVers: '1.0.0',
		temlate: 'dest',
		tasks: [
			'notify:watch',
			'concat',
			'jshint',
			'uglify',
			'newer:imagemin',
			'webfont',
			'less',
			'autoprefixer',
			'group_css_media_queries',
			'replace',
			'cssmin',
			'newer:copy',
			'pug',
			'notify:done'
		]
	};
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: "\n",
			},
			appjs: {
				src: [
					'bower_components/jquery/dist/jquery.js',
				],
				dest: 'test/js/appjs.js'
			},
			main: {
				src: [
					'src/js/main.js'
				],
				dest: 'test/js/main.js',
			},
		},
		jshint: {
			options: {
				expr: true,
				jshintrc: true,
				scripturl: true
			},
			src: [
				'src/js/*.js'
			]
		},
		uglify: {
			app: {
				options: {
					sourceMap: false,
					compress: true
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'test/js/appjs.js'
						],
						dest: '<%= globalConfig.temlate %>/js/',
						filter: 'isFile'
					}
				]
			},
			js: {
				options: {
					sourceMap: false,
					compress: true
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'test/js/main.js'
						],
						dest: '<%= globalConfig.temlate %>/js/',
						filter: 'isFile'
					}
				]
			}
		},
		imagemin: {
			base: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/*.{png,jpg,gif,svg}'
						],
						dest: '<%= globalConfig.temlate %>/images/',
						filter: 'isFile'
					}
				]
			}
		},
		webfont: {
			icons: {
				src: 'src/glyph/*.svg',
				dest: '<%= globalConfig.temlate %>/fonts',
				options: {
					hashes: true,
					relativeFontPath: '/<%= globalConfig.temlate %>/fonts/',
					destLess: 'src/less/fonts',
					font: 'webicons',
					types: 'eot,woff2,woff,ttf',
					fontFamilyName: 'Web Icons',
					stylesheets: ['less'],
					syntax: 'bootstrap',
					execMaxBuffer: 1024 * 400,
					htmlDemo: false,
					version: gc.fontVers,
					normalize: true,
					startCodepoint: 0xE900,
					iconsStyles: false,
					templateOptions: {
						baseClass: '',
						classPrefix: 'icon-'
					},
					embed: false,
					template: 'src/less/font-build.template'
				}
			},
			filetypes: {
				src: 'src/glyph/file-types/*.svg',
				dest: '<%= globalConfig.temlate %>/fonts',
				options: {
					hashes: true,
					relativeFontPath: '/<%= globalConfig.temlate %>/fonts/',
					destLess: 'src/less/fonts',
					font: 'filetypes',
					types: 'eot,woff2,woff,ttf',
					fontFamilyName: 'File Types',
					stylesheets: ['less'],
					syntax: 'bootstrap',
					execMaxBuffer: 1024 * 400,
					htmlDemo: false,
					version: gc.fontVers,
					normalize: true,
					startCodepoint: 0xE900,
					iconsStyles: false,
					templateOptions: {
						baseClass: '',
						classPrefix: 'filetype-'
					},
					embed: false,
					template: 'src/less/font-build.template'
				}
			}
		},
		less: {
			css: {
				options : {
					compress: true,
					ieCompat: false
				},
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					]
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: ['last 2 versions', 'Android 4', 'ie 8', 'ie 9', 'Firefox >= 27', 'Opera >= 12.0', 'Safari >= 6'],
				cascade: true
			},
			css: {
				files: {
					'test/css/prefix/main.css' : ['test/css/main.css'],
				}
			},
		},
		group_css_media_queries: {
			group: {
				files: {
					'test/css/media/main.css': ['test/css/prefix/main.css']
				}
			}
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: /\/\* *(.*?) *\*\//g,
							replacement: ' '
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/*.css'
						],
						dest: 'test/css/replace/',
						filter: 'isFile'
					}
				]
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			minify: {
				files: {
					'<%= globalConfig.temlate %>/css/main.css' : ['test/css/replace/main.css']
				}
			}
		},
		pug: {
			files: {
				options: {
					pretty: '\t',
					separator:  '\n'
				},
				files: {
					"index.html": ['src/pug/index.pug']
				}
			}
		},
		copy: {
			fonts: {
				expand: true,
				cwd: 'src/fonts',
				src: [
					'**.{ttf,svg,eot,woff,woff2}'
				],
				dest: '<%= globalConfig.temlate %>/fonts/',
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: __dirname+'\\src\\notify.png'
				}
			},
			done: {
				options: { 
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: __dirname+'\\src\\notify.png'
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			compile: {
				files: [
					'src/**/*.*'
				],
				tasks: gc.tasks
			}
		}
	});
	grunt.registerTask('dev',		['watch']);
	grunt.registerTask('default',	gc.tasks);
};