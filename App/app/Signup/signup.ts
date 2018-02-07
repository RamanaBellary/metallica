import { Component } from 'angular2/core';
import { Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from 'angular2/router';
import { Http, Headers, Response, RequestOptions } from 'angular2/http';

import { GlobalMembersUtil } from '../Util/GlobalMembersUtil';

@Component({
    selector: 'signup-page',
    templateUrl: './app/Signup/signup.html'
})

export class SignUp {
    userName: string;
    firstName: string;
    lastName: string;
    emailID: string;
    dateOfBirth: Date;
    gender: string = 'male';
    contactNo: number;
    password: string;
    signUpMessage: string

    constructor(private router: Router,
        private http: Http,
        private globalMembersUtil: GlobalMembersUtil) { }

    //TODO:On successful signup of the user display success message and redirect him to login page.
    OnSignUp() {
        console.log("On signup");
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var body = {
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.emailID,
            password: this.password
        };
        //console.log(JSON.stringify(body));
        this.http.post('http://localhost:3010/api/metallica/register', JSON.stringify(body), options)
            .subscribe(res => this.afterSignUp(res),err=>{
                let jsonData = err.json();
                console.log('response: ' + JSON.stringify(jsonData));
                let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                console.log("msg:" + JSON.stringify(jsonDataRes.msg));
                this.signUpMessage = jsonDataRes.msg;
            });
    }

    private afterSignUp(res: any) {
        //console.log('Status:' + res.status);
        let jsonData = res.json();

        let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
        console.log('Response: ' + jsonDataRes);

        if (jsonDataRes.status == "Ok") {
            this.router.navigate(['/Login']);
        }
        else {
            //TODO:show message in the UI saying login failure..
            console.log("inside else...")
        }
    }
}