import { Component } from 'angular2/core';
import { Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from 'angular2/router';
import { Http, Headers, Response } from 'angular2/http';
import 'rxjs/Rx';

import { GlobalMembersUtil } from '../Util/GlobalMembersUtil';
import { LoginService } from './Login.Service';


@Component({
    selector: 'login-page',
    templateUrl: './app/Login/login.html'
})

export class Login {
    userName: string;
    password: string;
    lblLoginMessage: string;
    //@Output() onUserLoggedIn = new EventEmitter<any>();

    constructor(private router: Router,
        private globalMembersUtil: GlobalMembersUtil,
        private http: Http,
        private loginService: LoginService) { }

    OnLogin() {
        //console.log("UserName Entered:" + this.userName);
        var hdr = new Headers({ 'content-type': 'application/json' });
        hdr.append('username', this.userName);
        //console.log('password', this.password);
        hdr.append('password', this.password);
        var rsp = Object;

        this.loginService.OnLogin(hdr)
            .subscribe(res => this.afterLogin(res), error => {
                let jsonData = error.json();
                console.log('response: ' + JSON.stringify(jsonData));
                let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                console.log("msg:" + JSON.stringify(jsonDataRes.msg));
                this.lblLoginMessage = jsonDataRes.msg;
            });
        //  this.http.get('http://localhost:8084/api/ris/login',{headers:hdr})
        //  .subscribe(res => this.afterLogin(res),
        //             error => console.log(error)) ;
    }

    OnCancel() {
        this.userName = this.password = this.lblLoginMessage = undefined;
    }

    private afterLogin(res: any) {
        //console.log('Status:' + res.status);
        let jsonData = res.json();
        console.log(JSON.stringify(jsonData));
        let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
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
    }
}