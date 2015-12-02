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
                        .then(translateToHttp);

                    function testStructuralPreconditions(task) {
                        if( Object.keys(task).length > 1 || Object.keys(task).indexOf('description') != 0 ) {
                            return $q.reject('Only description property is allowed');
                        }

                        if( task.description == null ) {
                            return $q.reject('description property could not be null or empty');
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

                        return $http(request).then(function (response) {
                            return response.data;
                        });
                    }
                },
                read: function (filters) {
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
                    if(filters){

                    }

                    return $http(request).then(function (response) {
                        return response.data;
                    });
                },
                update: function(task){
                    var taskId = task._id.$oid;
                    delete task._id;
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

                    return $http(request).then(function (response) {
                        return response.data;
                    });
                },
                delete: function(taskId){
                    var request = {
                        method: 'DELETE',
                        url: base_uri+'/'+taskId,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'apiKey': api_key
                        }
                    };

                    return $http(request).then(function (response) {
                        return response.data;
                    });
                }

            };
        }]);
})();