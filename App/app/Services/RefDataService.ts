import { Injectable } from 'angular2/core';
import { Http, Headers, Response, RequestOptions } from 'angular2/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Commodity } from '../Models/CommodityModel';
import { CounterParty } from '../Models/CounterPartyModel';
import { Location } from '../Models/LocationModel';

@Injectable()
export class RefDataService {
    constructor(private http: Http) {
    }

    public fetchCommodites() {
        let commodityList: Commodity[] = [];
        var hdr = new Headers({ 'content-type': 'application/json' });
        hdr.append('username', 'ramana.bellary');
        hdr.append('password', 'ramana');

        return this.http.get('http://localhost:3011/api/metallica/commodities', { headers: hdr })
            .map((res: Response) => {
                console.log('Status of fetchCommodities:' + res.status);
                if (res.status == 200) {
                    let jsonData = res.json();
                    // console.log('response: ' + JSON.stringify(jsonData));
                    let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    console.log("Inside Ok of commodities");
                    commodityList = jsonDataRes;
                    if (commodityList) {
                        console.log("commodities count: " + jsonDataRes.length);
                        return commodityList;
                    }
                }
                else {
                    console.log("inside else block of fetchCommodities");
                    return commodityList;
                }
            });

        //The below code can also be used, but to handle properly the above approach is followed.
        // return this.http.get('http://localhost:3011/api/metallica/commodities', { headers: hdr })
        //     .map((res: Response) => <Commodity[]>JSON.parse(JSON.stringify(res.json())));
    }

    public fetchCounterParties() {
        let counterpartyList: CounterParty[] = [];
        var hdr = new Headers({ 'content-type': 'application/json' });
        hdr.append('username', 'ramana.bellary');
        hdr.append('password', 'ramana');

        return this.http.get('http://localhost:3011/api/metallica/counterparties', { headers: hdr })
            .map((res: Response) => {
                console.log('Status of counterparties:' + res.status);
                if (res.status == 200) {
                    let jsonData = res.json();
                    // console.log('response: ' + JSON.stringify(jsonData));
                    let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    console.log("Inside Ok of counterparties");
                    counterpartyList = jsonDataRes;
                    if (counterpartyList) {
                        console.log("counterparties count: " + jsonDataRes.length);
                        return counterpartyList;
                    }
                }
                else {
                    console.log("inside else block of counterparties");
                    return counterpartyList;
                }
            });

        //The below code can also be used, but to handle properly the above approach is followed.
        // return this.http.get('http://localhost:3011/api/metallica/counterparties', { headers: hdr })
        //     .map((res: Response) => <CounterParty[]>JSON.parse(JSON.stringify(res.json())));
    }

    public fetchLocations() {
        let locationList: Location[] = [];
        var hdr = new Headers({ 'content-type': 'application/json' });
        hdr.append('username', 'ramana.bellary');
        hdr.append('password', 'ramana');

        return this.http.get('http://localhost:3011/api/metallica/locations', { headers: hdr })
            .map((res: Response) => {
                console.log('Status of locations:' + res.status);
                if (res.status == 200) {
                    let jsonData = res.json();
                    // console.log('response: ' + JSON.stringify(jsonData));
                    let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    console.log("Inside Ok of locations");
                    locationList = jsonDataRes;
                    if (locationList) {
                        console.log("locations count: " + jsonDataRes.length);
                        return locationList;
                    }
                }
                else {
                    console.log("inside else block of locations");
                    return locationList;
                }
            });

        //The below code can also be used, but to handle properly the above approach is followed.
        // return this.http.get('http://localhost:3011/api/metallica/locations', { headers: hdr })
        //     .map((res: Response) => <Location[]>JSON.parse(JSON.stringify(res.json())));
    }
}