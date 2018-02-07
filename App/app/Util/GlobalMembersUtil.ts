import {Injectable} from 'angular2/core';

@Injectable() export class GlobalMembersUtil{
IsUserLoggedIn:boolean = false;
LoggedInUserName:string = "";
}
