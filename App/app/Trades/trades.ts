import { Component, Pipe, PipeTransform } from 'angular2/core';
import { NgIf, NgFor, DatePipe } from "angular2/common";
import { Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from 'angular2/router';
import { Http, Headers, Response, RequestOptions,URLSearchParams } from 'angular2/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { GlobalMembersUtil } from '../Util/GlobalMembersUtil';
import { RefDataService } from '../Services/RefDataService';
import { Trade } from '../Models/TradeModel';
import { Commodity } from '../Models/CommodityModel';
import { CounterParty } from '../Models/CounterPartyModel';
import { Location } from '../Models/LocationModel';

@Component({
    directives: [NgIf, NgFor],
    templateUrl: './app/Trades/trades.html'
})

export class Trades {
    public selectedTrade: Trade;
    private orgTrade: Trade;
    isNewTrade = false;
    tradesList: Trade[] = [];
    commodityList: Commodity[];
    counterPartyList: CounterParty[] = [];
    locationList: Location[] = [];
    sideList = [
        { id: 1, value: 'Buy' },
        { id: 2, value: 'Sell' }
    ];
    statusList = [
        { id: 1, value: 'Open' },
        { id: 2, value: 'Nominated' }
    ];
    searchSide = this.sideList;
    counterParty:CounterParty;
    commodity:Commodity;
    location:Location;
    socket: any;

    constructor(private router: Router,
        private http: Http,
        private globalMembersUtil: GlobalMembersUtil,
        private RefDataService: RefDataService
    ) {
        this.searchSide = undefined;
        //this.socket = io.connect('http://localhost:3012');
        //this.socket.on('tradeUpdated',function(data){console.log('notification from service:'+ data)});
        if(globalMembersUtil.IsUserLoggedIn){
        RefDataService.fetchCommodites().subscribe(d => { this.commodityList = d });
        RefDataService.fetchCounterParties().subscribe(d => { this.counterPartyList = d });
        RefDataService.fetchLocations().subscribe(d => { this.locationList = d });
        this.fetchTrades();
    }
    else{
        console.log('First user should be logged-in');
        this.router.navigate(['/Login']);
    }
    }

    fetchTrades = function () {
        var hdr = new Headers({ 'content-type': 'application/json' });
        hdr.append('username', 'ramana.bellary');
        hdr.append('password', 'ramana');
        this.http.get('http://localhost:3010/api/metallica/trades', { headers: hdr })
            .subscribe(res => this.afterFetchingTrades(res));
    }

    private afterFetchingTrades(res: any) {
        console.log('Status:' + res.status);
        let jsonData = res.json();
        //console.log('response: '+JSON.stringify(jsonData));
        let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
        if (res.status == 200) {
            console.log("Inside Ok");
            //console.log('jsonData.data:'+JSON.stringify(jsonDataRes.trades));
            this.tradesList = jsonDataRes.trades;
            if (this.tradesList.length > 0) {
                console.log("trades count: " + this.tradesList.length);
                this.selectedTrade = this.tradesList[0];
            }
            else{
                this.selectedTrade = new Trade();
            }
        }
        else {
            //TODO:show message in the UI saying login failure..
            console.log("inside else...");
        }
    }

    private formatDate(dt: string) {
        return new Date(dt);
    }

    private tradeSelected(selectedTrade: Trade) {
        console.log("Selected Trade:" + JSON.stringify(selectedTrade));
        this.selectedTrade = Object.create(selectedTrade);
        this.orgTrade = Object.create(selectedTrade);
        this.isNewTrade = false;
    }

    private onCancel() {
        console.log("Cancel clicked..");
        this.selectedTrade = this.orgTrade;
        this.isNewTrade = false;
    }

    private createNewTrade() {
        console.log("new trade..");
        this.selectedTrade = new Trade();
        this.isNewTrade = true;
    }

    private onDelete() {
        console.log("delete trade..");
        //TODO:Confirmation dialog
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('username', 'ramana.bellary');
        headers.append('password', 'ramana');
        let options = new RequestOptions({ headers: headers });
        this.http.delete('http://localhost:3010/api/metallica/trades/' + this.selectedTrade._id, options)
            .subscribe(res => this.afterDeletingTrade(res));
    }

    private afterDeletingTrade(res: any) {
        console.log('res.json():' + res.json());
        let jsonData = res.json();

        let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
        console.log('Response: ' + jsonDataRes);

        if (jsonDataRes.status == "Ok") {
            console.log("Trade deleted successfully");
            this.fetchTrades();
        }
        else {
            //TODO:show message in the UI saying login failure..
            console.log("Trade delete failed !");
        }
    }

    private onSave() {
        console.log("selected trade date: " + this.selectedTrade);
        if (this.selectedTrade) {
            console.log("saving trade..");
            let headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('username', 'ramana.bellary');
            headers.append('password', 'ramana');
            let options = new RequestOptions({ headers: headers });
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
                    .subscribe(res => this.afterUpdateTrade(res));
            } else {
                this.http.put('http://localhost:3010/api/metallica/updateTrades', JSON.stringify(body), options)
                    .subscribe(res => this.afterUpdateTrade(res));
            }
        }
    }

    private afterUpdateTrade(res: any) {
        console.log('res.json():' + res.json());
        let jsonData = res.json();

        let jsonDataRes = JSON.parse(JSON.stringify(jsonData));
        console.log('Response: ' + jsonDataRes);

        if (jsonDataRes.status == "Ok") {
            console.log("Trade updated successfully");
            this.fetchTrades();
        }
        else {
            //TODO:show message in the UI saying login failure..
            console.log("Trade update failed !");
        }
    }

    private onSideSelectionChange(side: any): void {
        this.selectedTrade.Side = side;
    }

    private onSearchSideSelectionChange(side: any): void {
        this.searchSide = side;
    }

    private onCommodityChanged(cmdty: any): void {
        this.selectedTrade.Commodity = cmdty;
    }

    private onCoutnerPartyChanged(cpty: any): void {
        this.selectedTrade.CounterParty = cpty;
    }

    private onLocationChanged(loc: any): void {
        this.selectedTrade.Location = loc;
    }

    private onStatusChanged(status: any): void {
        this.selectedTrade.Status = status;
    }

    private onClear(): void {
        this.commodity = this.counterParty=this.location=this.searchSide=undefined;
    }
    private onSearch(): void {
        console.log("Commodity:"+this.commodity+
        ";Counter Party:"+this.counterParty+
        ";Location:"+this.location+
        ";Side:"+this.searchSide);

        var query = '';
        if(this.commodity){
            query = query+"commodity="+this.commodity;
        }

        if(this.counterParty){
            query = query != '' ? query + "&" : '';
            query = query + "counterParty="+this.counterParty;
        }
        
        if(this.location){
            query = query != '' ? query + "&" : '';
            query = query + "&location="+this.location;
        }

        if(this.searchSide){
            query = query != '' ? query + "&" : '';
            query = query + "&side="+this.searchSide;
        }

        if(query != ''){
            query="/?"+query;
        }

        var hdr = new Headers({ 'content-type': 'application/json' });
        hdr.append('username', 'ramana.bellary');
        hdr.append('password', 'ramana');        
        let options = new RequestOptions({ headers: hdr });


        this.http.get('http://localhost:3010/api/metallica/trades'+ query, options)
            .subscribe(res => this.afterFetchingTrades(res));
    }

    private onTradeUpdatedNotification(data): void {
        console.log('notification from service:'+ JSON.stringify(data));
    }    
}