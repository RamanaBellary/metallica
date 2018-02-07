System.register(['angular2/core', "angular2/common", 'angular2/router', 'angular2/http', 'rxjs/Rx', '../Util/GlobalMembersUtil', '../Services/RefDataService', '../Models/TradeModel'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, http_1, GlobalMembersUtil_1, RefDataService_1, TradeModel_1;
    var Trades;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
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
            function (RefDataService_1_1) {
                RefDataService_1 = RefDataService_1_1;
            },
            function (TradeModel_1_1) {
                TradeModel_1 = TradeModel_1_1;
            }],
        execute: function() {
            Trades = (function () {
                function Trades(router, http, globalMembersUtil, RefDataService) {
                    var _this = this;
                    this.router = router;
                    this.http = http;
                    this.globalMembersUtil = globalMembersUtil;
                    this.RefDataService = RefDataService;
                    this.isNewTrade = false;
                    this.tradesList = [];
                    this.counterPartyList = [];
                    this.locationList = [];
                    this.sideList = [
                        { id: 1, value: 'Buy' },
                        { id: 2, value: 'Sell' }
                    ];
                    this.statusList = [
                        { id: 1, value: 'Open' },
                        { id: 2, value: 'Nominated' }
                    ];
                    this.searchSide = this.sideList;
                    this.fetchTrades = function () {
                        var _this = this;
                        var hdr = new http_1.Headers({ 'content-type': 'application/json' });
                        hdr.append('username', 'ramana.bellary');
                        hdr.append('password', 'ramana');
                        this.http.get('http://localhost:3010/api/metallica/trades', { headers: hdr })
                            .subscribe(function (res) { return _this.afterFetchingTrades(res); });
                    };
                    this.searchSide = undefined;
                    //this.socket = io.connect('http://localhost:3012');
                    //this.socket.on('tradeUpdated',function(data){console.log('notification from service:'+ data)});
                    if (globalMembersUtil.IsUserLoggedIn) {
                        RefDataService.fetchCommodites().subscribe(function (d) { _this.commodityList = d; });
                        RefDataService.fetchCounterParties().subscribe(function (d) { _this.counterPartyList = d; });
                        RefDataService.fetchLocations().subscribe(function (d) { _this.locationList = d; });
                        this.fetchTrades();
                    }
                    else {
                        console.log('First user should be logged-in');
                        this.router.navigate(['/Login']);
                    }
                }
                Trades.prototype.afterFetchingTrades = function (res) {
                    console.log('Status:' + res.status);
                    var jsonData = res.json();
                    //console.log('response: '+JSON.stringify(jsonData));
                    var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    if (res.status == 200) {
                        console.log("Inside Ok");
                        //console.log('jsonData.data:'+JSON.stringify(jsonDataRes.trades));
                        this.tradesList = jsonDataRes.trades;
                        if (this.tradesList.length > 0) {
                            console.log("trades count: " + this.tradesList.length);
                            this.selectedTrade = this.tradesList[0];
                        }
                        else {
                            this.selectedTrade = new TradeModel_1.Trade();
                        }
                    }
                    else {
                        //TODO:show message in the UI saying login failure..
                        console.log("inside else...");
                    }
                };
                Trades.prototype.formatDate = function (dt) {
                    return new Date(dt);
                };
                Trades.prototype.tradeSelected = function (selectedTrade) {
                    console.log("Selected Trade:" + JSON.stringify(selectedTrade));
                    this.selectedTrade = Object.create(selectedTrade);
                    this.orgTrade = Object.create(selectedTrade);
                    this.isNewTrade = false;
                };
                Trades.prototype.onCancel = function () {
                    console.log("Cancel clicked..");
                    this.selectedTrade = this.orgTrade;
                    this.isNewTrade = false;
                };
                Trades.prototype.createNewTrade = function () {
                    console.log("new trade..");
                    this.selectedTrade = new TradeModel_1.Trade();
                    this.isNewTrade = true;
                };
                Trades.prototype.onDelete = function () {
                    var _this = this;
                    console.log("delete trade..");
                    //TODO:Confirmation dialog
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    headers.append('username', 'ramana.bellary');
                    headers.append('password', 'ramana');
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.http.delete('http://localhost:3010/api/metallica/trades/' + this.selectedTrade._id, options)
                        .subscribe(function (res) { return _this.afterDeletingTrade(res); });
                };
                Trades.prototype.afterDeletingTrade = function (res) {
                    console.log('res.json():' + res.json());
                    var jsonData = res.json();
                    var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    console.log('Response: ' + jsonDataRes);
                    if (jsonDataRes.status == "Ok") {
                        console.log("Trade deleted successfully");
                        this.fetchTrades();
                    }
                    else {
                        //TODO:show message in the UI saying login failure..
                        console.log("Trade delete failed !");
                    }
                };
                Trades.prototype.onSave = function () {
                    var _this = this;
                    console.log("selected trade date: " + this.selectedTrade);
                    if (this.selectedTrade) {
                        console.log("saving trade..");
                        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                        headers.append('username', 'ramana.bellary');
                        headers.append('password', 'ramana');
                        var options = new http_1.RequestOptions({ headers: headers });
                        var body = {
                            id: this.selectedTrade._id,
                            tradeDate: new Date(this.selectedTrade.TradeDate.toString()),
                            commodity: this.selectedTrade.Commodity,
                            side: this.selectedTrade.Side,
                            qty: this.selectedTrade.Qty,
                            price: this.selectedTrade.Price,
                            counterParty: this.selectedTrade.CounterParty,
                            location: this.selectedTrade.Location,
                            status: this.selectedTrade.Status
                        };
                        console.log('req:' + JSON.stringify(body));
                        if (this.isNewTrade) {
                            this.http.post('http://localhost:3010/api/metallica/insertTrades', JSON.stringify(body), options)
                                .subscribe(function (res) { return _this.afterUpdateTrade(res); });
                        }
                        else {
                            this.http.put('http://localhost:3010/api/metallica/updateTrades', JSON.stringify(body), options)
                                .subscribe(function (res) { return _this.afterUpdateTrade(res); });
                        }
                    }
                };
                Trades.prototype.afterUpdateTrade = function (res) {
                    console.log('res.json():' + res.json());
                    var jsonData = res.json();
                    var jsonDataRes = JSON.parse(JSON.stringify(jsonData));
                    console.log('Response: ' + jsonDataRes);
                    if (jsonDataRes.status == "Ok") {
                        console.log("Trade updated successfully");
                        this.fetchTrades();
                    }
                    else {
                        //TODO:show message in the UI saying login failure..
                        console.log("Trade update failed !");
                    }
                };
                Trades.prototype.onSideSelectionChange = function (side) {
                    this.selectedTrade.Side = side;
                };
                Trades.prototype.onSearchSideSelectionChange = function (side) {
                    this.searchSide = side;
                };
                Trades.prototype.onCommodityChanged = function (cmdty) {
                    this.selectedTrade.Commodity = cmdty;
                };
                Trades.prototype.onCoutnerPartyChanged = function (cpty) {
                    this.selectedTrade.CounterParty = cpty;
                };
                Trades.prototype.onLocationChanged = function (loc) {
                    this.selectedTrade.Location = loc;
                };
                Trades.prototype.onStatusChanged = function (status) {
                    this.selectedTrade.Status = status;
                };
                Trades.prototype.onClear = function () {
                    this.commodity = this.counterParty = this.location = this.searchSide = undefined;
                };
                Trades.prototype.onSearch = function () {
                    var _this = this;
                    console.log("Commodity:" + this.commodity +
                        ";Counter Party:" + this.counterParty +
                        ";Location:" + this.location +
                        ";Side:" + this.searchSide);
                    var query = '';
                    if (this.commodity) {
                        query = query + "commodity=" + this.commodity;
                    }
                    if (this.counterParty) {
                        query = query != '' ? query + "&" : '';
                        query = query + "counterParty=" + this.counterParty;
                    }
                    if (this.location) {
                        query = query != '' ? query + "&" : '';
                        query = query + "&location=" + this.location;
                    }
                    if (this.searchSide) {
                        query = query != '' ? query + "&" : '';
                        query = query + "&side=" + this.searchSide;
                    }
                    if (query != '') {
                        query = "/?" + query;
                    }
                    var hdr = new http_1.Headers({ 'content-type': 'application/json' });
                    hdr.append('username', 'ramana.bellary');
                    hdr.append('password', 'ramana');
                    var options = new http_1.RequestOptions({ headers: hdr });
                    this.http.get('http://localhost:3010/api/metallica/trades' + query, options)
                        .subscribe(function (res) { return _this.afterFetchingTrades(res); });
                };
                Trades.prototype.onTradeUpdatedNotification = function (data) {
                    console.log('notification from service:' + JSON.stringify(data));
                };
                Trades = __decorate([
                    core_1.Component({
                        directives: [common_1.NgIf, common_1.NgFor],
                        templateUrl: './app/Trades/trades.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, GlobalMembersUtil_1.GlobalMembersUtil, RefDataService_1.RefDataService])
                ], Trades);
                return Trades;
            }());
            exports_1("Trades", Trades);
        }
    }
});
//# sourceMappingURL=trades.js.map