(function(){
    'use strict';

    define([
        'angular',
        'angular-route',
        './routes/routes',
        'app'
    ], function (angular) {

        require(['domReady!'], function (document) {
            angular.bootstrap(document, ['app']);
        });
    });

})();
