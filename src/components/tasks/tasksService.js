(function() {
    'use strict';

    /* Tasks Services */
    angular.module('tasksModule')
        .factory('Tasks', ['config', '$http', '$q', function (config, $http, $q) {
            var base_uri = config.mongolab.base_uri;
            var api_key = config.mongolab.api_key;

            return {
                create: function(task){
                    return  testStructuralPreconditions(task)
                        .then(translateToHttp)
                        .then(translate_idToid);

                    function testStructuralPreconditions(task) {
                        if( Object.keys(task).length > 1 || Object.keys(task).indexOf('description') !== 0 ) {
                            return $q.reject('Only description property is allowed');
                        }

                        if(_.isEmpty(task.description) || _.isUndefined(task.description) || _.isNull(task.description) ) {
                            return $q.reject('The description property could not be null or empty');
                        }


                        return $q.resolve(task);
                    }

                    function translateToHttp(task) {
                        task.status = 'WIP';
                        var request = {
                            method: 'POST',
                            url: base_uri,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                'apiKey': api_key
                            },
                            data: task
                        };

                        return $http(request).then( function(response) {
                            return response.data;
                        });
                    }
                },
                read: function () {
                    var request = {
                        method: 'GET',
                        url: base_uri,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'apiKey': api_key
                        }
                    };

                    return $http(request).then(function (response) {
                        return response.data.map(translate_idToid);
                    });
                },
                update: function(task){
                    return  testStructuralPreconditions(task)
                        .then(translateToHttp)
                        .then(translate_idToid);

                    function testStructuralPreconditions(task) {
                        if( Object.keys(task).length > 3 ||
                            Object.keys(task).indexOf('id') === -1 ||
                            Object.keys(task).indexOf('description') === -1 ||
                            Object.keys(task).indexOf('status') === -1 ) {
                            return $q.reject('Only id, description and status property is allowed');
                        }

                        if(_.isEmpty(task.id) || _.isUndefined(task.id) || _.isNull(task.id) ) {
                            return $q.reject('The id property could not be null or empty');
                        }

                        if(_.isEmpty(task.description) || _.isUndefined(task.description) || _.isNull(task.description) ) {
                            return $q.reject('The description property could not be null or empty');
                        }

                        if(_.isEmpty(task.status) || _.isUndefined(task.status) || _.isNull(task.status) ) {
                            return $q.reject('The status property could not be null or empty');
                        }

                        return $q.resolve(task);
                    }

                    function translateToHttp(task) {
                        var taskId = task.id;
                        delete task.id;

                        var request = {
                            method: 'PUT',
                            url: base_uri+'/'+taskId,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                'apiKey': api_key
                            },
                            data: task
                        };

                        return $http(request).then( function(response) {
                            return response.data;
                        });
                    }
                },
                delete: function(taskId){
                    return  testStructuralPreconditions(taskId)
                        .then(translateToHttp)
                        .then(translate_idToid);

                    function testStructuralPreconditions(taskId) {
                        if(_.isEmpty(taskId) || _.isUndefined(taskId) || _.isNull(taskId) ) {
                            return $q.reject('The taskId could not be null or empty');
                        }

                        return $q.resolve(taskId);
                    }

                    function translateToHttp(taskId) {
                        var request = {
                            method: 'DELETE',
                            url: base_uri + '/' + taskId,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                'apiKey': api_key
                            }
                        };

                        return $http(request).then(function (response) {
                            return response.data[0];
                        });
                    }
                }

            };

            function translate_idToid(task) {
                task.id = task._id.$oid;
                delete task._id;
                return task;
            }
        }]);
})();