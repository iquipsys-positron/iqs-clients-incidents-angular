// Karma configuration

module.exports = function (config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'src',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            '../node_modules/pip-webui-all/dist/pip-webui-lib.js',
            '../node_modules/pip-webui-all/dist/pip-webui-lib-optional.js',
            '../node_modules/pip-webui-all/dist/pip-webui.js',
            '../node_modules/pip-webui-tasks/node_modules/angular-mocks/angular-mocks.js',
            '../node_modules/angular-mocks/angular-mocks.js',  // for new NPM folders system
            '../test/def/google.js',
            '../dist/pip-admin-system.js',
            '../dist/iqs-client-incidents-app.js',
            '../dist/iqs-client-shell2.js',
            '../dist/iqt-admin-sytem.js',
            '../dist/pip-suite.js',
            {pattern: '../dist/*.html', included: false},
            '../test/test_config.js',
            '../test/**/*.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE ||
        // config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['PhantomJS'],
         browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
