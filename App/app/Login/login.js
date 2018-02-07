System.register(['angular2/core', 'angular2/router', 'angular2/http', 'rxjs/Rx', '../Util/GlobalMembersUtil', './Login.Service'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, GlobalMembersUtil_1, Login_Service_1;
    var Login;
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
            function (_1) {},
            function (GlobalMembersUtil_1_1) {
                GlobalMembersUtil_1 = GlobalMembersUtil_1_1;
            },
            function (Login_Service_1_1) {
                Login_Service_1 = Login_Service_1_1;
            }],
        execute: function() {
            Login = (function () {
                //@Output() onUserLoggedIn = new EventEmitter<any>();
                function Login(router, globalMembersUtil, http, loginService) {
                    this.router = router;
                    this.globalMembersUtil = globalMembersUtil;
                    this.http = http;
                    this.loginService = loginService;
                }
                Login.prototype.OnLogin = function () {
                    var _this = this;
                    //console.log("UserName Entered:" + this.userName);
                    var hdr = new http_1.Headers({ 'content-type': 'application/json' });
                    hdr.append('username', this.userName);
                    //console.log('password', this.password);
                    hdr.append('password', this.password);
                    var rsp = Object;
                    this.loginService.OnLogin(hdr)
                        .subscribe(function (res) { return _this.afterLogin(res); }, function (error) {
                        var jsonData = error.json();
                        console.log('response: ' + JSON.stringify(jsonData));
                        var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                        console.log("msg:" + JSON.stringify(jsonDataRes.msg));
                        _this.lblLoginMessage = jsonDataRes.msg;
                    });
                    //  this.http.get('http://localhost:8084/api/ris/login',{headers:hdr})
                    //  .subscribe(res => this.afterLogin(res),
                    //             error => console.log(error)) ;
                };
                Login.prototype.OnCancel = function () {
                    this.userName = this.password = this.lblLoginMessage = undefined;
                };
                Login.prototype.afterLogin = function (res) {
                    //console.log('Status:' + res.status);
                    var jsonData = res.json();
                    console.log(JSON.stringify(jsonData));
                    var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    //console.log(jsonDataRes.status);
                    if (jsonDataRes.status == "Ok") {
                        this.globalMembersUtil.IsUserLoggedIn = true;
                        this.globalMembersUtil.LoggedInUserName = this.userName;
                        this.lblLoginMessage = '';
                        this.router.navigate(['/Home']);
                    }
                    else {
                        console.log("inside else...");
                    }
                };
                Login = __decorate([
                    core_1.Component({
                        selector: 'login-page',
                        templateUrl: './app/Login/login.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, GlobalMembersUtil_1.GlobalMembersUtil, http_1.Http, Login_Service_1.LoginService])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.js.map