var moment = require("moment");
var MissionControl = require("../model/mission_control");
var assert = require("assert");

var missionControl = new MissionControl({db : null});

describe("Mission Control", function () {
    describe("The Current Mission", function () {
        var currentMission;
        before(function (done) {
           missionControl.currentMission(function(err,res){
               currentMission = res;
               done();
           }) ;
        });
        it("is created if none exist", function () {
            assert(currentMission);
        });
    });
});