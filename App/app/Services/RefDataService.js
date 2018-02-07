System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var RefDataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            RefDataService = (function () {
                function RefDataService(http) {
                    this.http = http;
                }
                RefDataService.prototype.fetchCommodites = function () {
                    var commodityList = [];
                    var hdr = new http_1.Headers({ 'content-type': 'application/json' });
                    hdr.append('username', 'ramana.bellary');
                    hdr.append('password', 'ramana');
                    return this.http.get('http://localhost:3011/api/metallica/commodities', { headers: hdr })
                        .map(function (res) {
                        console.log('Status of fetchCommodities:' + res.status);
                        if (res.status == 200) {
                            var jsonData = res.json();
                            // console.log('response: ' + JSON.stringify(jsonData));
                            var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
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
                };
                RefDataService.prototype.fetchCounterParties = function () {
                    var counterpartyList = [];
                    var hdr = new http_1.Headers({ 'content-type': 'application/json' });
                    hdr.append('username', 'ramana.bellary');
                    hdr.append('password', 'ramana');
                    return this.http.get('http://localhost:3011/api/metallica/counterparties', { headers: hdr })
                        .map(function (res) {
                        console.log('Status of counterparties:' + res.status);
                        if (res.status == 200) {
                            var jsonData = res.json();
                            // console.log('response: ' + JSON.stringify(jsonData));
                            var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
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
                };
                RefDataService.prototype.fetchLocations = function () {
                    var locationList = [];
                    var hdr = new http_1.Headers({ 'content-type': 'application/json' });
                    hdr.append('username', 'ramana.bellary');
                    hdr.append('password', 'ramana');
                    return this.http.get('http://localhost:3011/api/metallica/locations', { headers: hdr })
                        .map(function (res) {
                        console.log('Status of locations:' + res.status);
                        if (res.status == 200) {
                            var jsonData = res.json();
                            // console.log('response: ' + JSON.stringify(jsonData));
                            var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
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
                };
                RefDataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RefDataService);
                return RefDataService;
            }());
            exports_1("RefDataService", RefDataService);
        }
    }
});
//# sourceMappingURL=RefDataService.js.map