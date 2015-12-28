(function() {
    'use strict';

    //TODO Make better each property test (test the reject reason)
    describe('Tasks Service', function() {
        var scope = {};
        var base_uri = 'carlos';
        var api_key = 'sarlanga';
        var configMock = {"mongolab": {"base_uri": base_uri, "api_key": api_key}};

        beforeEach(function(){
            module('tasksModule');

            module(function($provide) {
                $provide.constant('config', configMock);
            });

            inject(function ($rootScope) {
                scope = $rootScope.$new();
            });
        });

       describe('Read method', function() {
            it('Should translate read service to http GET method', inject(function(Tasks, $httpBackend) {
                $httpBackend.when('GET', configMock.mongolab.base_uri + '?apiKey=' + configMock.mongolab.api_key)
                    .respond([ { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

                expect(Tasks.read()).to.eventually.have.length(1);
                $httpBackend.flush();

            }));

            it('Should translate mongodb _id to id', inject(function(Tasks, $httpBackend) {
                $httpBackend.when('GET', configMock.mongolab.base_uri + '?apiKey=' + configMock.mongolab.api_key)
                    .respond([ { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

                expect(Tasks.read()).to.eventually.have.deep.property('[0].id', '565c94a8e4b03d453c995e48');

                $httpBackend.flush();
            }));
        });

    });
})();
