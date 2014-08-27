'use strict';

module.exports = {
	app: {
		title: 'MEAN.JS',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				//'public/lib/bootstrap/dist/css/bootstrap.css',
				//'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/css/style.css'
			],
			js: [
                'public/lib/ng-file-upload/angular-file-upload-shim.min.js',
                'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',

                'public/lib/lodash/dist/lodash.underscore.min.js',
                'public/lib/angular-google-maps/dist/angular-google-maps.min.js',

                'public/lib/ng-file-upload/angular-file-upload.min.js',


                //'public/lib/underscore/underscore.js',
                //'public/lib/angular-bind-polymer/angular_bind_polymer.js',
                'public/lib/angular-wizard/dist/angular-wizard.min.js',
                'public/lib/gsap/src/minified/utils/Draggable.min.js',
                'public/lib/gsap/src/minified/TweenMax.min.js',
                'public/lib/gsap/src/minified/TimelineMax.min.js',
                'public/lib/gsap/src/minified/plugins/ScrollToPlugin.min.js',
                //'public/modules/galleries/temp/ThrowPropsPlugin.min.js',
                //'public/lib/jquery/dist/jquery.min.js'
                'public/lib/angular-smart-table/dist/smart-table.min.js'

			]
		},
		css: [
            'public/dist/css/style.min.css'
            //'public/css/*.css',
            //'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};