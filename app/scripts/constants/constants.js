(function(){
    'use strict';

    define(['angular'], function (angular) {

        angular.module('app.constants', [])
            .constant('appConstants', {

                dataPath: 'fake-data.json'

            })
    });

})();
