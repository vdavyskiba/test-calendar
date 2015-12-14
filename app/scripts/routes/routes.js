(function(){
    'use strict';

    define(['app'], function (app) {

        app.config(['$routeProvider', function ($routeProvider) {

            $routeProvider.when('/', {
                templateUrl: 'scripts/controllers/main/main.html',
                controller: 'main'
            });

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]);
    });

})();
