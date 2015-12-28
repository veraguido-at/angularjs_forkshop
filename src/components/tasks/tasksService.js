(function() {
    'use strict';

    /* Tasks Services */
    angular.module('tasksModule')
        .factory('Tasks', ['config', '$http', function (config, $http) {
            var base_uri = config.mongolab.base_uri;
            var api_key = config.mongolab.api_key;

            return {
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
                }

            };

            function translate_idToid(task) {
                task.id = task._id.$oid;
                delete task._id;
                return task;
            }
        }]);
})();