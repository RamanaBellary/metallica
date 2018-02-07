import { Component } from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';//Load all features
import {Router, ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {LoginService} from './Login/Login.Service';
import {Home} from './Home/home';
import {Login} from './Login/login';
import {SignUp} from './Signup/signup';
import {Trades} from './Trades/trades';
import {GlobalMembersUtil} from './Util/GlobalMembersUtil';
import {PageNotFound} from './PageNotFound/pageNotFoundComponent';
import {RefDataService} from './Services/RefDataService';

@Component({
    selector: 'metallica-app',
    templateUrl: './app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:[HTTP_PROVIDERS,
               ROUTER_PROVIDERS,
               LoginService,
               RefDataService,
               GlobalMembersUtil]
})

@RouteConfig([
    { path: '', name: 'Home', component: Home, useAsDefault: true },
    { path: '/Home', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'SignUp', component: SignUp },
    { path: '/trades', name: 'Trades', component: Trades },
    { path: '**', component: PageNotFound }
])

export class AppComponent {
    // isUserLoggedIn: boolean=false;
    // userName: string = 'Ramana';
    

    constructor(private router: Router, private globalMembersUtil:GlobalMembersUtil) { }

    NavigateToSignUpPage(){
      console.log("Navigating To SignUp Page");
      this.router.navigate(['/SignUp']);
    }

    NavigateToLoginPage(){
      console.log("Navigating To Login Page");
    this.router.navigate(['/Login']);
    }

    onUserLoggedIn(object){      
      console.log("Updated app.component after the user has logged in");
    }

    Logout(){
      console.log("Logout");
      this.globalMembersUtil.IsUserLoggedIn = false;
      this.globalMembersUtil.LoggedInUserName="";
      this.router.navigate(['/Home']);
    }
}