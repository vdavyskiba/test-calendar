(function(){
    'use strict';

    require.config({

        //entry point
        deps: ['bootstrap'],

        shim: {
            'angular': {
                exports: 'angular',
                deps: [ 'jquery' ]
            },
            'angular-route': {
                deps: [ 'angular' ]
            },
            'jquery-ui': {
                deps: [ 'jquery' ]
            },
            'jquery-overlaps': {
                deps:[ 'jquery-ui']
            }
        },

        paths: {
            'text': 'bower_components/requirejs-text/text',
            'domReady': '../bower_components/requirejs-domready/domReady',
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'angular': '../bower_components/angular/angular.min',
            'angular-route': '../bower_components/angular-route/angular-route.min',
            'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',
            'jquery-overlaps': '../libs/jquery-overlaps/jquery-overlaps'
        }
    });

})();
