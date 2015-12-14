(function(){
    'use strict';

    define([
        'angular',
        './constants/constants',
        './models/index',
        './services/index',
        './controllers/index',
        './directives/index'
    ], function (angular) {

        return angular.module('app', [
            'app.constants',
            'app.models',
            'app.services',
            'app.controllers',
            'app.directives',
            'ngRoute'
        ]).run([function(){
            console.log('run')
        }]);
    });

})();
