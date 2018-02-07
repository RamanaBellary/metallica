import { Injectable } from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';

@Injectable()
export class LoginService {
    constructor(private http: Http) {}
    OnLogin(hdr: Headers)
    {
        return this.http.post('http://localhost:3010/api/metallica/login',null,{headers:hdr});
    }
}