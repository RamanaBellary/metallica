System.register(['angular2/core', 'angular2/router', 'angular2/http', '../Util/GlobalMembersUtil'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, GlobalMembersUtil_1;
    var SignUp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (GlobalMembersUtil_1_1) {
                GlobalMembersUtil_1 = GlobalMembersUtil_1_1;
            }],
        execute: function() {
            SignUp = (function () {
                function SignUp(router, http, globalMembersUtil) {
                    this.router = router;
                    this.http = http;
                    this.globalMembersUtil = globalMembersUtil;
                    this.gender = 'male';
                }
                //TODO:On successful signup of the user display success message and redirect him to login page.
                SignUp.prototype.OnSignUp = function () {
                    var _this = this;
                    console.log("On signup");
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var body = {
                        userName: this.userName,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.emailID,
                        password: this.password
                    };
                    //console.log(JSON.stringify(body));
                    this.http.post('http://localhost:3010/api/metallica/register', JSON.stringify(body), options)
                        .subscribe(function (res) { return _this.afterSignUp(res); }, function (err) {
                        var jsonData = err.json();
                        console.log('response: ' + JSON.stringify(jsonData));
                        var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                        console.log("msg:" + JSON.stringify(jsonDataRes.msg));
                        _this.signUpMessage = jsonDataRes.msg;
                    });
                };
                SignUp.prototype.afterSignUp = function (res) {
                    //console.log('Status:' + res.status);
                    var jsonData = res.json();
                    var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    console.log('Response: ' + jsonDataRes);
                    if (jsonDataRes.status == "Ok") {
                        this.router.navigate(['/Login']);
                    }
                    else {
                        //TODO:show message in the UI saying login failure..
                        console.log("inside else...");
                    }
                };
                SignUp = __decorate([
                    core_1.Component({
                        selector: 'signup-page',
                        templateUrl: './app/Signup/signup.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, GlobalMembersUtil_1.GlobalMembersUtil])
                ], SignUp);
                return SignUp;
            }());
            exports_1("SignUp", SignUp);
        }
    }
});
//# sourceMappingURL=signup.js.map