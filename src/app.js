(function() {
    'use strict';

    //TODO: Make config load from another file not declared here

    /* App level declaration */
    angular.module('todoApp', ['configModule', 'ngRoute', 'tasksModule']);
})();