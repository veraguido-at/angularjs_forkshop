(function() {
    'use strict';

    /* jasmine specs for tasks controllers go here */
    describe('Tasks Controller', function() {
        var scope = {};
        var tasksMock = {read:function(){}};
        var configMock = {"googleapis": {"base_uri": "http://basce_uri"}};
        var parseServiceMock = function(){this.pathToJson = function () {return {};};};
        var tokenMock = function(){return {get: function(){},save: function(){},delete: function(){}};};


        beforeEach(function(){
            module('tasksModule');

            module(function($provide) {
                $provide.constant('config', configMock);
                $provide.service('ParseService', parseServiceMock);
                $provide.factory('Token', tokenMock);
                $provide.factory('Tasks', tasksMock);
            });

            inject(function ($compile, $rootScope, $q) {
                scope = $rootScope.$new();
                spyOn(tasksMock, "read").and.returnValue($q.when([{'name': 'X'},{'name': 'Y'}]));
            });
        });

        it('Should startup tasks with empty set', inject(function($controller) {
            $controller('TasksController', {$scope:scope, Tasks: tasksMock});
            expect(scope.tasks.length).toBe(0);
        }));

        it('Should bind 2 tasks from service to scope', inject(function($controller) {
            $controller('TasksController', {$scope:scope, Tasks: tasksMock});
            scope.$digest();
            expect(scope.tasks.length).toBe(2);
        }));
    });
})();
