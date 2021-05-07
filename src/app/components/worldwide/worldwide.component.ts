import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from 'src/app/service/dashboard.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-worldwide',
  templateUrl: './worldwide.component.html',
  styleUrls: ['./worldwide.component.css']
})
export class WorldwideComponent implements OnInit {

  constructor(public nav: AppComponent, private DashSer: DashboardService) { }

  WorldData: any;
  CountryData: any;

  lastUpdate: any;
  active: any;
  activePerOneMillion: any;
  affectedCountries: any;
  cases: any;
  casesPerOneMillion: any;
  deaths: any;
  deathsPerOneMillion: any;
  recovered: any;
  tests: any;
  todayCases: any;
  todayDeaths: any;

  ngOnInit(): void {
    this.nav.routelinkr = 2;
    console.log(this.nav.routelinkr)
    this.getWorldData();
    this.getCountryData();
  }
  ngOnDestroy() {
    this.nav.routelinkr = 1;
    console.log(this.nav.routelinkr)
  }

  getWorldData() {
    this.DashSer.WorldData().subscribe((Response) => {
      this.WorldData = Response;
      this.LastUpdate(Response.updated)
      this.active = Response.active;
      this.activePerOneMillion = Response.activePerOneMillion;
      this.affectedCountries = Response.affectedCountries;
      this.cases = Response.cases;
      this.casesPerOneMillion = Response.casesPerOneMillion;
      this.deaths = Response.deaths;
      this.deathsPerOneMillion = Response.deathsPerOneMillion;
      this.recovered = Response.recovered;
      this.tests = Response.tests;
      this.todayCases = Response.todayCases;
      this.todayDeaths = Response.todayDeaths;

      console.log(this.WorldData);
    },
      (Error) => {
        console.error("Error");
      });
  }

  getCountryData() {
    this.DashSer.CountryData().subscribe((Response) => {
      this.CountryData = Response;
      console.log(this.CountryData)
    },
      (Error) => {
        console.error("Error");
      });
  }

  LastUpdate(timestamp) {
    console.log(timestamp)
    let unix_timestamp = timestamp
    var date = new Date(unix_timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var tdate = this.monthfinder(date.getMonth()) + " " + date.getDate()
    var formattedTime = tdate + ' , ' + hours + ':' + minutes.substr(-2);
    this.lastUpdate = formattedTime;
  }

  monthfinder(mnth) {
    if (mnth == 0) {
      return ("January")
    }
    else if (mnth == 1) {
      return ("February")
    }
    else if (mnth == 2) {
      return ("March")
    }
    else if (mnth == 3) {
      return ("April")
    }
    else if (mnth == 4) {
      return ("May")
    }
    else if (mnth == 5) {
      return ("June")
    }
    else if (mnth == 6) {
      return ("July")
    }
    else if (mnth == 7) {
      return ("August")
    }
    else if (mnth == 8) {
      return ("Septemper")
    }
    else if (mnth == 9) {
      return ("October")
    }
    else if (mnth == 10) {
      return ("November")
    }
    else {
      return ("December")
    }

  }

}
