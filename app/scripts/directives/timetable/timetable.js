(function(){
    'use strict';

    define(['../module', 'jquery', 'jquery-overlaps'], function (directives, $) {

        directives.directive('timetable', ['$timeout', function ($timeout) {

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'scripts/directives/timetable/timetable.html',
                scope: {
                    data: '='
                },
                link: function ($scope, $element) {

                    var hourInPx = parseInt($element.height()/24),
                        elements;

                    $scope.hoursList = new Array(24);

                    $scope.$watch(function(){
                        return $scope.data;
                    }, function(data){
                        if(data && data.length){
                            destroyPlugins();
                            initPlugins();

                        }
                    });

                    //hours to css{top, height}
                    $scope.calcOffset = function(model){
                        var h1 = model.model.start.getHours();
                        var m1 = model.model.start.getMinutes();
                        var h2 = model.model.end.getHours();
                        var m2 = model.model.end.getMinutes();
                        var t1 = hourInPx * h1 + (m1 ? hourInPx * m1/60 : 0);
                        var t2 = hourInPx * h2 + (m2 ? hourInPx * m2/60 : 0);
                        return {
                            top: t1,
                            height: t2 - t1
                        }
                    };

                    function initPlugins(){

                        var $top,
                            $height;

                        elements = $element.find('.timetable-item');

                        elements.draggable({
                            axis: 'y',
                            containment: 'parent',

                            drag: function(event,ui) {

                                var $this = $(this);

                                var collide = elements.filter(':not(.ui-draggable-dragging)').overlaps($this);

                                if(collide.targets.length){
                                    $this.addClass('warning');
                                } else {
                                    $this.removeClass('warning');
                                }

                                $top = $scope.calcOffset($this.scope().item).top;

                            },
                            stop: function(event,ui) {

                                var $this = $(this);

                                var collide = elements.filter(':not(.ui-draggable-dragging)').overlaps($this);

                                if(collide.targets.length){
                                    ui.position.top = $top;
                                    $this.removeClass('warning');
                                    $this.css('top', $top);
                                }

                                onDragEnd($this.scope().item.model, ui.position.top)
                            }
                        });

                        elements.resizable({
                            handles: "s",
                            containment: 'parent',
                            start: function(event, ui){
                                $(this).addClass('custom-resizing');
                            },
                            resize: function(event,ui) {

                                var $this = $(this);

                                var collide = elements.filter(':not(.custom-resizing)').overlaps($this);

                                if(collide.targets.length){
                                    $this.addClass('warning');
                                } else {
                                    $this.removeClass('warning');
                                }

                                $height = $scope.calcOffset($this.scope().item).height;

                            },
                            stop: function(event,ui) {

                                var $this = $(this);

                                var collide = elements.filter(':not(.custom-resizing)').overlaps($this);

                                if(collide.targets.length){
                                    ui.size.height = $height;
                                    $this.removeClass('warning');
                                    $this.css('height', $height);
                                }

                                $this.removeClass('custom-resizing');

                                onResizeEnd($this.scope().item.model, ui.position.top, ui.size.height)
                            }
                        })
                    }

                    function onResizeEnd(model, top, height){

                        var result = offsetToDate(height);

                        var dH = model.start.getHours();
                        var dM = model.start.getMinutes();

                        $timeout(function(){

                            if(result.hours + dH >=24){
                                model.end.setHours(23);
                                model.end.setMinutes(59);
                            } else {
                                model.end.setHours(result.hours + dH);
                                model.end.setMinutes(result.minutes + dM);
                            }

                        });
                    }

                    function onDragEnd(model, top){

                        var result = offsetToDate(top);
                        var dH = model.end.getHours() - model.start.getHours();
                        var dM = model.end.getMinutes() - model.start.getMinutes();

                        $timeout(function(){
                            model.start.setHours(result.hours);
                            model.start.setMinutes(result.minutes);
                            if(result.hours + dH >=24){
                                model.end.setHours(23);
                                model.end.setMinutes(59);
                            } else {
                                model.end.setHours(result.hours + dH);
                                model.end.setMinutes(result.minutes + dM);
                            }

                        });
                    }

                    //offset pixels to Hours
                    function offsetToDate(val){

                        var hour = val/hourInPx;
                        var hours = parseInt(hour);
                        var minutes = parseInt((hour - hours) * 60);

                        return {
                            hours: hours,
                            minutes: minutes
                        };
                    }

                    function destroyPlugins(){
                        elements && elements.length && elements.draggable('destroy')
                        elements = null;
                    }

                    $scope.$on('$destroy', function(){
                        destroyPlugins();
                    });

                }
            };

        }]);
    });

})();
