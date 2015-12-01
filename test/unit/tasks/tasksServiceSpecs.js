(function() {
    'use strict';

    /* jasmine specs for lists services go here */

    describe('List Service', function() {
        var scope = {};
        var configMock = {"mongolab": {"base_uri": "http://base_uri", "api_key": "lalala"}};
        //var tokenMock = function(){return {get: function(){},save: function(){},delete: function(){}};};

        beforeEach(function(){
            module('tasksModule');

            module(function($provide) {
                $provide.constant('config', configMock);
                //$provide.factory('Token', tokenMock);
            });

            inject(function ($rootScope) {
                scope = $rootScope.$new();
            });
        });

        it('Should startup lists with empty set', inject(function(Tasks, $httpBackend) {
            $httpBackend.when('GET', 'http://base_uri')
                .respond([ { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

            Tasks.read().then(function(items){
                expect(items.length).toBe(1);
            });
            $httpBackend.flush();
        }));

    });
})();
