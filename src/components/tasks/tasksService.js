(function() {
    'use strict';

    /* Tasks Services */
    angular.module('tasksModule')
        .factory('Tasks', ['config', '$http', function (config, $http) {
            var base_uri = config.mongolab.base_uri;
            var api_key = config.mongolab.api_key;

            return {
                create: function(task){
                    task.status = 'WIP';
                    var request = {
                        method: 'POST',
                        url: base_uri,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        param: {
                            'apiKey': api_key
                        },
                        data: task
                    };

                    return $http(request).then(function (response) {
                        return response.data;
                    });
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
                        param: {
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
                        param: {
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