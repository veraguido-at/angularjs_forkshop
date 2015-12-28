"use strict";

module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            'test/libs/function-bind-polyfill.js',
            'src/libs/bower_components/angular/angular.js',
            'src/libs/bower_components/angular-mocks/angular-mocks.js',
            'src/libs/bower_components/angular-route/angular-route.js',
            'src/libs/bower_components/underscore/underscore.js',
            'src/app.js',
            'src/config.js',
            'src/components/**/*Module.js',
            'src/components/**/*.js',
            'test/unit/**/*.js'
        ],

        reporters : ['coverage', 'threshold'],
        coverageReporter : {
            dir : 'coverage/',
            reporters : [
                { type: 'html', subdir: '.'},
                { type: 'lcovonly', subdir: '.', file: 'lcov-report.txt' }
            ]


        },
        preprocessors : {
            'src/app.js': 'coverage',
            'src/components/**/*.js': 'coverage',
            'src/libs/utils/utils.js': 'coverage'
        },

        thresholdReporter: {
            statements: 50,
            branches: 50,
            functions: 50,
            lines: 50
        },

        colors : true,
        singleRun : true,
        autoWatch: false,

        frameworks: ['chai-as-promised', 'chai', 'mocha'],
        browsers: ['PhantomJS'],

        plugins: ['karma-phantomjs-launcher', 'karma-mocha', 'karma-chai', 'karma-chai-as-promised', 'karma-coverage', 'karma-threshold-reporter']
    });
};