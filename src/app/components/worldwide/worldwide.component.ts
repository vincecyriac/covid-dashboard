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

  CountryData: any = [];
  continentData:any=[];

  lastUpdate: any;
  active: any;
  activePerOneMillion: any;
  cases: any;
  casesPerOneMillion: any;
  deaths: any;
  deathsPerOneMillion: any;
  recovered: any;
  tests: any;
  todayCases: any;
  todayDeaths: any;

  countries: any = [];
  continents: any = [];

  cntryactive: any;
  cntrycases: any;
  cntrydeaths: any;
  cntryrecovered: any;
  cntrytests: any;
  cntrytodayCases: any;
  cntrytodayDeaths: any;

  cntntactive: any;
  cntntcases: any;
  cntntdeaths: any;
  cntntrecovered: any;
  cntnttests: any;
  cntnttodayCases: any;
  cntnttodayDeaths: any;

  inActive: any;
  inConfirmed: any;
  inTested: any;
  inDeath: any;
  inrecovered: any;
  inNewcases: any;
  inNewdeath: any;

  loaded: boolean;

  ngOnInit(): void {
    this.nav.routelinkr = 2;
    this.loaded=true;
    this.getWorldData();
    this.getContinentData();
    this.getCountryData();
    this.getIndiaData();
  }
  ngOnDestroy() {
    this.nav.routelinkr = 1;
  }
  getIndiaData() {
    this.DashSer.IndiaData().subscribe((Response) => {
      this.inConfirmed = Response["TT"].total.confirmed;
      this.inDeath = Response["TT"].total.deceased;
      this.inTested = Response["TT"].total.tested;
      this.inrecovered = Response["TT"].total.recovered;
      this.inActive = this.inConfirmed - this.inDeath - this.inrecovered - Response["TT"].total.other;
      if (Response["TT"].delta) {
        if (Response["TT"].delta.confirmed) {
          this.inNewcases = Response["TT"].delta.confirmed;
        }
        else {
          this.inNewcases = "N/A";
        }
        if (Response["TT"].delta.deceased) {
          this.inNewdeath = Response["TT"].delta.deceased;
        }
        else {
          this.inNewdeath = "N/A";
        }
      }
      else {
        this.inNewcases = "N/A";
        this.inNewdeath = "N/A";
      }
    },
      (Error) => {
        console.error("Error");
      });
  }

  getWorldData() {
    this.DashSer.WorldData().subscribe((Response) => {
      this.LastUpdate(Response.updated)
      this.active = Response.active;
      this.activePerOneMillion = Response.activePerOneMillion;
      this.cases = Response.cases;
      this.casesPerOneMillion = Response.casesPerOneMillion;
      this.deaths = Response.deaths;
      this.deathsPerOneMillion = Response.deathsPerOneMillion;
      this.recovered = Response.recovered;
      this.tests = Response.tests;
      this.todayCases = Response.todayCases;
      this.todayDeaths = Response.todayDeaths;

    },
      (Error) => {
        console.error("Error");
      });
  }

  getCountryData() {
    this.DashSer.CountryData().subscribe((Response) => {
      this.CountryData = Response;
      this.setMapFill(Response);
      this.pushCountry(Response);
      this.individualCountry("Afghanistan");
    },
      (Error) => {
        console.error("Error");
      });
  }

  pushCountry(data) {
    this.countries = [];
    data.forEach(element => {
      this.countries.push(element.country)
    });
    if (this.CountryData != null || this.continentData != null || this.cntntactive != "N/A") {
      this.loaded = false;
    }
  }

  countrySelect(event) {
    this.individualCountry(event.srcElement.value);
  }

  individualCountry(country) {

    if (country == "India") {
      this.cntryactive = this.inActive;
      this.cntrycases = this.inConfirmed;
      this.cntrydeaths = this.inDeath;
      this.cntryrecovered = this.inrecovered;
      this.cntrytests = this.inTested;
      this.cntrytodayCases = this.inNewcases;
      this.cntrytodayDeaths = this.inNewdeath;
    }
    else{
      this.CountryData.forEach(element => {
        if (element.country == country) {
          this.cntryactive = element.active;
          this.cntrycases = element.cases;
          this.cntrydeaths = element.deaths;
          this.cntryrecovered = element.recovered;
          this.cntrytests = element.tests;
          this.cntrytodayCases = element.todayCases;
          this.cntrytodayDeaths = element.todayDeaths;
        }
      });
    }
  }


  setMapFill(data) {
    data.forEach(element => {
      if (element.countryInfo.iso2 != null) {
        document.getElementById(element.countryInfo.iso2).style.fill = this.findColor(element.active)
      }
    });
  }


  findColor(total) {
    if (total >= (5000000)) {
      return ("#FF0000")
    }
    else if (total >= (4000000)) {
      return ("#FF1100")
    }
    else if (total >= 3000000) {
      return ("#FF2300")
    }
    else if (total >= 2000000) {
      return ("#FF3400")
    }
    else if (total >= 1000000) {
      return ("#FF4600")
    }
    else if (total >= 500000) {
      return ("#FF5700")
    }
    else if (total >= 300000) {
      return ("#FF6900")
    }
    else if (total >= 200000) {
      return ("#FF7B00")
    }
    else if (total >= 100000) {
      return ("#FF8C00")
    }
    else if (total >= 80000) {
      return ("#FF9E00")
    }
    else if (total >= 50000) {
      return ("#FFAF00")
    }
    else if (total >= 30000) {
      return ("#FFC100")
    }
    else if (total >= 15000) {
      return ("#FFD300")
    }
    else if (total >= 10000) {
      return ("#FFE400")
    }
    else if (total >= 5000) {
      return ("#FFF600")
    }
    else if (total >= (4000)) {
      return ("#F7FF00")
    }
    else if (total >= 3000) {
      return ("#E5FF00")
    }
    else if (total >= 2000) {
      return ("#D4FF00")
    }
    else if (total >= 1000) {
      return ("#C2FF00")
    }
    else if (total >= 900) {
      return ("#B0FF00")
    }
    else if (total >= 800) {
      return ("#9FFF00")
    }
    else if (total >= 700) {
      return ("#8DFF00")
    }
    else if (total >= 600) {
      return ("#7CFF00")
    }
    else if (total >= 500) {
      return ("#6AFF00")
    }
    else if (total >= 400) {
      return ("#58FF00")
    }
    else if (total >= 300) {
      return ("#47FF00")
    }
    else if (total >= 200) {
      return ("#24FF00")
    }
    else if (total >= 100) {
      return ("#12FF00")
    }
    else {
      return ("#00FF00")
    }
  }

  LastUpdate(timestamp) {
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



  getContinentData(){
    this.DashSer.ContinentData().subscribe((Response) => {
      this.pushContinent(Response);
      this.continentData=Response;
      this.individualContinent("North America")
    },
      (Error) => {
        console.error("Error");
      });    
  }
  pushContinent(data){
    this.continents = [];
    data.forEach(element => {
      this.continents.push(element.continent)
    });
  }

  continentSelect(event){
    this.individualContinent(event.srcElement.value);
  }

  individualContinent(continent){
    this.continentData.forEach(element => {
      if (element.continent == continent) {
        this.cntntactive = element.active;
        this.cntntcases = element.cases;
        this.cntntdeaths = element.deaths;
        this.cntntrecovered = element.recovered;
        this.cntnttests = element.tests;
        this.cntnttodayCases = element.todayCases;
        this.cntnttodayDeaths = element.todayDeaths;
      }
    });
  }
}
