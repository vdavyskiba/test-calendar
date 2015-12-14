(function(){
    'use strict';

    define(['../module'], function (services) {

        services.factory('service', ['$http', 'appConstants', 'EventModel', function($http, appConstants, EventModel){

            return {

                fetch: function(success, error){

                    return $http.get(appConstants.dataPath)
                        .success(function(data){
                            success(data.map(function(item){
                                return new EventModel(item)
                            }))
                        })
                        .error(error);
                }
            }
        }]);
    });

})();
