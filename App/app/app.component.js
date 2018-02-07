System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', 'angular2/router', './Login/Login.Service', './Home/home', './Login/login', './Signup/signup', './Trades/trades', './Util/GlobalMembersUtil', './PageNotFound/pageNotFoundComponent', './Services/RefDataService'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, Login_Service_1, home_1, login_1, signup_1, trades_1, GlobalMembersUtil_1, pageNotFoundComponent_1, RefDataService_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Login_Service_1_1) {
                Login_Service_1 = Login_Service_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (signup_1_1) {
                signup_1 = signup_1_1;
            },
            function (trades_1_1) {
                trades_1 = trades_1_1;
            },
            function (GlobalMembersUtil_1_1) {
                GlobalMembersUtil_1 = GlobalMembersUtil_1_1;
            },
            function (pageNotFoundComponent_1_1) {
                pageNotFoundComponent_1 = pageNotFoundComponent_1_1;
            },
            function (RefDataService_1_1) {
                RefDataService_1 = RefDataService_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                // isUserLoggedIn: boolean=false;
                // userName: string = 'Ramana';
                function AppComponent(router, globalMembersUtil) {
                    this.router = router;
                    this.globalMembersUtil = globalMembersUtil;
                }
                AppComponent.prototype.NavigateToSignUpPage = function () {
                    console.log("Navigating To SignUp Page");
                    this.router.navigate(['/SignUp']);
                };
                AppComponent.prototype.NavigateToLoginPage = function () {
                    console.log("Navigating To Login Page");
                    this.router.navigate(['/Login']);
                };
                AppComponent.prototype.onUserLoggedIn = function (object) {
                    console.log("Updated app.component after the user has logged in");
                };
                AppComponent.prototype.Logout = function () {
                    console.log("Logout");
                    this.globalMembersUtil.IsUserLoggedIn = false;
                    this.globalMembersUtil.LoggedInUserName = "";
                    this.router.navigate(['/Home']);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'metallica-app',
                        templateUrl: './app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [http_1.HTTP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS,
                            Login_Service_1.LoginService,
                            RefDataService_1.RefDataService,
                            GlobalMembersUtil_1.GlobalMembersUtil]
                    }),
                    router_1.RouteConfig([
                        { path: '', name: 'Home', component: home_1.Home, useAsDefault: true },
                        { path: '/Home', name: 'Home', component: home_1.Home },
                        { path: '/login', name: 'Login', component: login_1.Login },
                        { path: '/signup', name: 'SignUp', component: signup_1.SignUp },
                        { path: '/trades', name: 'Trades', component: trades_1.Trades },
                        { path: '**', component: pageNotFoundComponent_1.PageNotFound }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, GlobalMembersUtil_1.GlobalMembersUtil])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map