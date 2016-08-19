var assert = require("assert");
var membershipApplication = require("../model/membership_application");
var helpers = require("./helpers")

describe("Applying for mission", function () {

    var validApp;

    before(function () {
       validApp = helpers.validApplication;
    });

   describe("Validations successful if ...", function () {
       it("Application is valid if all validations return true", function () {
           assert(validApp.isValid(), "Not valid");
       });
       it("Email is 4 or more chars, and contains an @", function () {
           assert(validApp.emailIsValid(), "Email not valid");
       });
       it("Height is between 60 and 75 inches", function () {
           assert(validApp.heightIsValid(), "Height not valid");
       });
       it("Age is between 15 and 100", function () {
           assert(validApp.ageIsValid(), "Age not valid");
       });
       it("Weight is between 100 and 300", function () {
           assert(validApp.weightIsValid(), "Weight not valid");
       });
       it("Both first and last name are 2 or more chars in length", function () {
           assert(validApp.nameIsValid(), "Name not valid");
       });
   }) ;

    describe("Application invalid if ....", function () {

        it("is expired!", function () {
                var app = new membershipApplication({validUntil : Date.parse("01/01/2010")});
                assert(app.expired());
            });

       it('Email is less than 4 chars ', function () {
           var app = new membershipApplication({email : "dd"});
           assert(!app.emailIsValid());
       });
        it('Email does not contain an @ ', function () {
            var app = new membershipApplication({email : "thingthing:thing.com"});
            assert(!app.emailIsValid());
        });
        it('Email is omitted', function () {
            var app = new membershipApplication();
            assert(!app.emailIsValid());
        });
        it('Height is less than 60 inches', function () {
            var app = new membershipApplication({height : "10"});
            assert(!app.heightIsValid());
        });
        it('Height is more than 75 inches', function () {
            var app = new membershipApplication({height : "80"});
            assert(!app.heightIsValid());
        });
        it('Height is omitted', function () {
            var app = new membershipApplication();
            assert(!app.heightIsValid());
        });
        it('Age is less than 15', function () {
            var app = new membershipApplication({age : "10"});
            assert(!app.ageIsValid());
        });
        it('Age is more than 100', function () {
            var app = new membershipApplication({age : "101"});
            assert(!app.ageIsValid());
        });
        it('Age is omitted', function () {
            var app = new membershipApplication();
            assert(!app.ageIsValid());
        });
        it('Weight is less than 100', function () {
            var app = new membershipApplication({age : "10"});
            assert(!app.weightIsValid());
        });
        it('Weight is more than 300', function () {
            var app = new membershipApplication({age : "301"});
            assert(!app.weightIsValid());
        });
        it('Weight is omitted', function () {
            var app = new membershipApplication();
            assert(!app.weightIsValid());
        });
        it('First name is omitted', function () {
            var app = new membershipApplication();
            assert(!app.nameIsValid());
        });
        it('First name is less than 2 characters', function () {
            var app = new membershipApplication({first : "a"});
            assert(!app.nameIsValid());
        });
        it('Last name is omitted', function () {
            var app = new membershipApplication();
            assert(!app.nameIsValid());
        });
        it('Last name is less than 2 characters', function () {
            var app = new membershipApplication({last : "h"});
            assert(!app.nameIsValid());
        });
    });
});