(function() {
    'use strict';

    /* jasmine specs for lists services go here */

    describe('List Service', function() {
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

        //Translation asserts
        /*it('Should translate read service to httpGet base_uri', inject(function(Tasks, $httpBackend) {
            $httpBackend.when('GET', configMock.mongolab.base_uri)
                .respond([ { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

            Tasks.read().then(function(items){
                expect(items.length).toBe(1);
            });

            $httpBackend.flush();
        }));*/

        it('Should translate create service to httpPost', inject(function(Tasks, $httpBackend) {
            var taskToCreate = {"description" : "Hacer el commit inicial"};

            $httpBackend.when('POST', configMock.mongolab.base_uri)
                .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el commit inicial" , "status" : "WIP"});

            Tasks.create(taskToCreate).then(function(createdTask){
                expect(createdTask._id).not.toBeNull();
            });

            $httpBackend.flush();
        }));

        it('Should translate delete service to httpDelete', inject(function(Tasks, $httpBackend){
            var taskIdToDelete = "565c94a8e4b03d453c995e48";

            $httpBackend.when('DELETE', configMock.mongolab.base_uri+"/"+taskIdToDelete)
                .respond({ "_id" : { "$oid" : taskIdToDelete} , "description" : "Hacer el workshop" , "status" : "WIP"});

            Tasks.delete(taskIdToDelete).then(function(deletedTask){
                expect(deletedTask._id).not.toBeNull();
            });

            $httpBackend.flush();
        }));

        it('Should translate update service to httpPut', inject(function(Tasks, $httpBackend){
            var taskToUpdate = { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el Commit inicial" , "status" : "WIP"};

            $httpBackend.when('PUT', configMock.mongolab.base_uri+"/"+taskToUpdate._id.$oid)
                .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el Commit inicial" , "status" : "WIP"});

            Tasks.update(taskToUpdate).then(function(updatedTask){
                expect(updatedTask._id).not.toBeNull();
            });

            $httpBackend.flush();
        }));

        //Functionality asserts
        it('Should apply status WIP to all new tasks', inject(function(Tasks, $httpBackend) {
            var taskToCreate = {"description" : "Hacer el commit inicial"};

            $httpBackend.when('POST', configMock.mongolab.base_uri)
                .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : taskToCreate.description , "status" : "WIP"});

            Tasks.create(taskToCreate);

            var taskWithWIP = _.clone(taskToCreate);
            taskWithWIP.status = 'WIP';
            $httpBackend.expectPOST(configMock.mongolab.base_uri, taskWithWIP);
            $httpBackend.flush();
        }));

        it('Should translate delete service to httpDelete', inject(function(Tasks, $httpBackend){
            var taskIdToDelete = "565c94a8e4b03d453c995e48";

            $httpBackend.when('DELETE', configMock.mongolab.base_uri+"/"+taskIdToDelete)
                .respond([ { "_id" : { "$oid" : taskIdToDelete} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

            Tasks.delete(taskIdToDelete).then(function(deletedTask){
                expect(deletedTask._id).not.toBeNull();
            });

            $httpBackend.flush();
        }));

        /*it('Should list all tasks when omitting filter param', inject(function(Tasks, $httpBackend) {
            $httpBackend.when('GET', configMock.mongolab.base_uri)
                .respond([ { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

            Tasks.read().then(function(items){
                expect(items.length).toBe(1);
            });

            $httpBackend.flush();
        }));*/

    });
})();
