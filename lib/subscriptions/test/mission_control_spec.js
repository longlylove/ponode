var moment = require("moment");
var Mission = require("../model/mission");
var MissionControl = require("../model/mission_control");
var assert = require("assert");
var db = require("../db");
var sinon = require("sinon");

sinon.stub(db, "getMissionByLaunchDate").yields(null,null);
sinon.stub(db, "createNextMission").yields(null,new Mission());
var missionControl = new MissionControl({db: db});

describe("Mission Planning", function () {
    describe("No Current Mission", function () {
        var currentMission;
        before(function (done) {
           missionControl.currentMission(function(err,res){
               currentMission = res;
               done();
           }) ;
        });
        it("is created if none exist", function () {
            assert.notEqual(currentMission.launchDate,null);
            assert(db.getMissionByLaunchDate.called);
        });
    });

    describe("Current Mission Exists", function () {
        var currentMission;
        before(function (done) {
            db.getMissionByLaunchDate.restore(); // unwrap db method before to wrap it again
            sinon.stub(db, "getMissionByLaunchDate").yields(null,{id: 10000});
            missionControl.currentMission(function(err,res){
                currentMission = res;
                done();
            }) ;
        });
        it("it returns mission #10000", function () {
            assert.equal(currentMission.id, 10000);
            console.log(currentMission.id);
            assert(db.getMissionByLaunchDate.called);
        });
    });
});