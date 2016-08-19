var moment = require("moment");
var assert = require("assert");
var Mission = require("../model/mission");

var MissionControl = function (args) {
  assert(args.db, "Need a DB instance");
    this.db = args.db;
};

MissionControl.prototype.currentMission = function (next) {

    //the current mission is the one that starts the first
    //of next month
    var nextMission = moment().add(1,"month").startOf("month");
    var formattedMissionDate = nextMission.format("MM-DD-YYYY");
    var self = this;

    //pull from the DB
    //this.db.find({launchDate : formattedMissionDate}, function (err,foundMission) {

    this.db.getMissionByLaunchDate(formattedMissionDate, function(err,foundMission) {
        //no bubbling here, throw
        assert.ok(err === null, err);

        //if there is a saved mission, send it along
        if(foundMission) {
            next(null, new Mission(foundMission));
        } else {
            //create it and save
            foundMission = new Mission();
            //self.db.insert(foundMission, function (err, result) {
            self.db.createNextMission(foundMission, function(err,result){
                next(err, foundMission);
            });
        }
    });
};

MissionControl.prototype.hasSpaceForRole = function(role, next){
    this.currentMission(function (err, mission) {
        var hasRoom = mission.needsRole(role);
        next(null,hasRoom);
    });
};

module.exports = MissionControl;