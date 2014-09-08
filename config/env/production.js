'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/mean',
	assets: {
		lib: {
			css: [
                'public/css/style.css'
			],
			js: [
                'public/lib/ng-file-upload/angular-file-upload-shim.min.js',
                'public/lib/ace-builds/src-min-noconflict/ace.js',

                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/jquery-ui/ui/jquary-ui.js',

                'public/lib/angular/angular.js',
                'public/lib/angular-sanitize/angular-sanitize.min.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-animate/angular-animate.js',

                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',

                'public/lib/angular-ui-calendar/src/calendar.js',
                'public/lib/fullcalendar/fullcalendar.js',
                'public/lib/fullcalendar/gcal.js',

                'public/lib/lodash/dist/lodash.underscore.min.js',
                'public/lib/angular-google-maps/dist/angular-google-maps.min.js',
                'public/lib/ng-file-upload/angular-file-upload.min.js',
                'public/lib/angular-wizard/dist/angular-wizard.min.js',

                'public/lib/gsap/src/minified/TweenMax.min.js',
                'public/lib/gsap/src/minified/TimelineMax.min.js',
                'public/lib/gsap/src/minified/utils/Draggable.min.js',
                //'public/lib/gsap/src/minified/plugins/ThrowPropsPlugin.min.js',
                "public/lib/gsap/src/minified/plugins/CSSPlugin.min.js",
                'public/lib/gsap/src/minified/plugins/ScrollToPlugin.min.js',

                'public/lib/angular-smart-table/dist/smart-table.min.js',
                'public/lib/requirejs/require.js',

                //deprecated aloha editor
                //'public/lib/ng-aloha-editor/libs/alohaeditor-0.23.26/aloha/lib/aloha-full.min.js',

                'public/3rdlib/opencpu/opencpu-0.5.js',
                'public/lib/angular-ui-ace/ui-ace.js',

                //text Angular

                'public/lib/textAngular/dist/textAngular-sanitize.min.js',
                'public/lib/textAngular/dist/textAngular.min.js'
			]
		},
		css: 'public/dist/css/style.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};