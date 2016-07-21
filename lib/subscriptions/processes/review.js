/*//No need for async
var Emitter = require("events").EventEmitter;
var util = require("util");*/

var async = require("async");
var assert = require("assert");

var ReviewProcess = function (args) {

    //var callback;

    //Using Async way
    assert(args.application, "Need an application to review");
    var app = args.application;

    //Make sure the app is valid
    //Changing working with 'app'  to 'next' to be working correctly with Node

    //this.ensureAppValid = function (app) {
    this.ensureAppValid = function (next) {
        if(app.isValid())
        {
            //this.emit("validated", app);
            next(null,true);
        } else {
            //this.emit("invalid", app.validationMessage());
            next(app.validationMessage(),null);
        };
    };

    //Find the next mission
    this.findNextMission = function (next) {
        //stub this out for now
        /*app.mission = {
            commander : null,
            pilot : null,
            MAVPilot : null,
            passengers: []
        };*/

        var mission = {
            commander : null,
            pilot : null,
            MAVPilot : null,
            passengers: []
        };
        //this.emit("mission-selected",app);
        next(null,mission);
    };

    //Make sure is selected and available
    this.roleIsAvailable = function (next) {
        //No concept of role selection just yet
        //TODO: a role? more info
        //this.emit("role-available",app);
        next(null,true);
    };

    //Make sure geight/weight/age is right for role
    this.ensureRoleCompatible = function (next) {
      //TODO: find out about roles and height/weight etc
        //this.emit("role-compatible", app);
        next(null,true);
    };

    /*//Accept the app with a message
    this.acceptApplication = function (next) {
        callback(null, {
           success : true,
            message : "Welcome to Mars program!"
        });
    };

    //Deny the app with a message
    this.denyApplication = function (message) {
        callback(null, {
            success : false,
            message : message
        });
    };*/

    //this.processApplication = function (app, next) {

     //Async call
    this.approveApplication = function (next) {
      next(null,true);
    };

    this.processApplication = function (next) {
        //callback = next;
        //this.emit("application-received", app);

        //--- Async way
        /*async.series([
            this.ensureAppValid,
            this.findNextMission,
            this.roleIsAvailable,
            this.ensureRoleCompatible
        ],*/
        async.series({
            validated: this.ensureAppValid,
            mission: this.findNextMission,
            roleAvailable: this.roleIsAvailable,
            roleCompatible: this.ensureRoleCompatible,
            success: this.approveApplication
        },
            function (err,result) {
           if(err){
               next(null, {
                  success : false,
                   message : err
               });
           } else {
                /*next(null, {
                   success : true,
                    message : "Welcome to Mars!"
                });*/

               result.message = "Welcome to Mars!"; 
               console.log(result);
               next(null, result);
           }
        });

    };

    /*//Doing Async so removing event chaining
    //event path
    this.on("application-received", this.ensureAppValid);
    this.on("validated", this.findNextMission);
    this.on("mission-selected", this.roleIsAvailable);
    this.on("role-available", this.ensureRoleCompatible);
    this.on("role-compatible", this.acceptApplication);

    //sad path
    this.on("invalid", this.denyApplication);*/
};

//util.inherits(ReviewProcess,Emitter);
module.exports = ReviewProcess;