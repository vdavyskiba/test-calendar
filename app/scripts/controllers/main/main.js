(function(){
    'use strict';

    define(['../module'], function (controllers) {

        controllers.controller('main', ['$scope', '$filter', 'service', 'EventModel', function ($scope, $filter, service, EventModel) {

            $scope.model = {
                list: null,
                newItems: []
            };

            service.fetch(function(data){

                $scope.model.list = data.map(function(item){
                    return {
                        model: item,
                        state: 'view'
                    }
                });

            }, console.error);

            $scope.remove = function(item){
                var idx = $scope.model.list.indexOf(item);
                $scope.model.list.splice(idx, 1);
            };

            $scope.save = function(){
                var item = $scope.model.newItems.pop();
                item.state='view';
                $scope.model.list.push(item);
            };

            $scope.cancel = function(){
                $scope.model.newItems.pop();
            };

            $scope.add = function(){

                $scope.model.newItems.unshift({
                    model: new EventModel({
                        name:'unnamed event'
                    }),
                    state: 'new'
                })
            };

        }]);

    });

})();
