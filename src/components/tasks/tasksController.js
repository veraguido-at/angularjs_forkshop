(function() {
    'use strict';

    /* Tasks Controllers */
    angular.module('tasksModule')
        .controller('TasksController', ['$scope', 'Tasks', function ($scope, Tasks) {
            $scope.tasks = [];

            Tasks.read().then(function (tasks) {
                $scope.tasks = tasks;
            });
        }]);
})();
