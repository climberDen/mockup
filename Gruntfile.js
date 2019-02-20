module.exports = function(grunt) {
	
	//подключает модуль
	require('jit-grunt')(grunt);
	
	grunt.initConfig({
		//конфигурация (задание) отвечающая за компиляцию less в css
		less: {
			development: {
				files: {
					'./assets/css/main.css': './less/main.less',
					'./assets/css/page.css': './less/page.less',
					'./assets/css/roboto.css': './less/roboto.less'
				}
			}
		},
		//конфигурация (задание) отвечает за отслеживание файлов проекта

		watch: {
			styles: {
				files: [
				'less/*.less',
				'less/**/*.less' //which files to watch
				],
				tasks: ['less:development', 'jshint'],
				options: {
					nospawn: true
				}
			}
		},
		//утилита для повышения качества кода
		//на потенциально плохой код
		jshint: {
			all: ['Gruntfile.js', 'js/**/*.js'],
			options: {
				//форматирование вывода
				reporter: require('jshint-stylish'),
				//эти параметры указывают jshint-у
				//более строго проверять ваш код
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				freeze: true,
				forin: true,
				newcap: true,
				// чтобы не ругалось на функции библиотеки
				globals: {
					jQuery: true
				}
			}
		}
	});
	// компилирует less в css
	grunt.loadNpmTasks('grunt-contrib-less');
	// отслеживает изменения в файлах
	grunt.loadNpmTasks('grunt-contrib-watch');
	// проверяет качество кода
	grunt.loadNpmTasks('grunt-contrib-jshint');

	/* watch */
	// компилирует less и запускает watch. если в конфиге есть
	// ошибки - мы узнаем об этом сразу
	grunt.registerTask('watch-dev',
		['less:development','jshint','watch']);
};