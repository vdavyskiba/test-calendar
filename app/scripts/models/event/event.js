(function(){
    'use strict';

    define(['../module'], function (models) {

        models.factory('EventModel', [function(){

            /**
             * Event Model
             * @param {Object} data
             * @constructor
             */
            var EventModel = function (data) {

                this.id = data.id;

                this.name = data.name;

                this.start = data.start && new Date(data.start);

                this.end = data.end && new Date(data.end);

            };

            return EventModel;

        }]);
    });

})();
