var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../model/membership_application");

var sinon = require("sinon");

describe('The Review Process', function () {
    describe('Receiving a valid application', function () {
        var decision;
        var validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });
        var review = new ReviewProcess();

        // Spy on the function
        //var spy = sinon.spy(validApp,"emailIsValid");

        //Spy on the event path\step of the process
        /*---------- Sinon works by calling the function directly like below here
        ------------ var spy = sinon.spy(review,"ensureAppValid");*/

        //Spy will work
        var applicationReceivedSpy = sinon.spy();
        var validatedSpy = sinon.spy();
        var missionSelectedSpy = sinon.spy();
        var roleAvailableSpy = sinon.spy();
        var roleCompatibleSpy = sinon.spy();

        before(function (done) {
            /*validApp = new MembershipApplication({
                first: "Test",
                last: "User",
                email: "test@test.com",
                age: 30,
                height: 66,
                weight: 180
            });
            var review = new ReviewProcess();*/
            // ---- Sinon spy on

            review.on("application-received", applicationReceivedSpy);
            review.on("validated", validatedSpy);
            review.on("mission-selected", missionSelectedSpy);
            review.on("role-available", roleAvailableSpy);
            review.on("role-compatible", roleCompatibleSpy);

            review.processApplication(validApp, function (err,result) {
                decision = result;
                done();
            });
        });

        it('returns success', function () {
            assert(decision.success, decision.message);
        });

        /*it('validate email', function () {
            //assert(spy.called);
            assert(validApp.emailIsValid.called);
        });*/

        it('ensure the application is received', function () {
           assert(applicationReceivedSpy.called);
        });

        it('ensures the application is valid', function () {

            // ---- calling spy on 1 single event -----//
            //assert(spy.called);

            // ---- calling spy and counting number of calls --------//
            //assert.equal(testSpy.callCount, 5);

            assert(validatedSpy.called);
        });

        it('select a mission', function () {
           assert(missionSelectedSpy.called);
        });

        it('ensures a role exists', function () {
            assert(roleAvailableSpy.called);
        });

        it('ensures role compatibility', function () {
            assert(roleCompatibleSpy.called);
        });
    });
});