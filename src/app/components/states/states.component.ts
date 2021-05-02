import { Component, OnInit} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  result: any;
  IndiaTotalCases: any = 0;
  IndiaTotalActive: any = 0;
  IndiaTotalDead: any = 0;
  IndiaTotalRecovered: any = 0;
  IndiaTotalVaccinated: any = 0;
  IndiaTotalOther: any = 0;
  IndiaLastUpdate: any;
  IndiaLastUpdateTime: any;
  News: any;

  constructor(private nav: AppComponent, private DashSer: DashboardService) { }

  ngOnInit(): void {
    this.nav.routelinkr = 1;
    console.log(this.nav.routelinkr)
    this.getIndiaData();
    this.getNews();
  }


  ngOnDestroy() {
    this.nav.routelinkr = 2;
    console.log(this.nav.routelinkr)
  }


  timestampConvert(timestamp) {
    let unix_timestamp = timestamp
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var tdate= this.monthfinder(date.getMonth()) + " " + date.getDate()
    var formattedTime =tdate +' , ' +  hours + ':' + minutes.substr(-2);
    return(formattedTime);
  }


  monthfinder(mnth){
    if(mnth==0){
      return("January")
    }
    else if(mnth==1){
      return("February")
    }
    else if(mnth==2){
      return("March")
    }
    else if(mnth==3){
      return("April")
    }
    else if(mnth==4){
      return("May")
    }
    else if(mnth==5){
      return("June")
    }
    else if(mnth==6){
      return("July")
    }
    else if(mnth==7){
      return("August")
    }
    else if(mnth==8){
      return("Septemper")
    }
    else if(mnth==9){
      return("October")
    }
    else if(mnth==10){
      return("November")
    }
    else{
      return("December")
    }
    
  }


  getIndiaData() {
    this.DashSer.IndiaData().subscribe((Response) => {
      
      this.getTotal(Response);
      this.setMapColor(Response);
    },
      (Error) => {
        console.error("Error");
      });
  }


  getTotal(data) {
    let keys = [];
    for (let key in data) {
      keys.push({ key, value: data[key] });
    }
    // console.log(keys)

    for (let i in keys) {
      this.IndiaTotalCases += keys[i].value.total.confirmed;
      this.IndiaTotalDead += keys[i].value.total.deceased;
      this.IndiaTotalRecovered += keys[i].value.total.recovered;
      this.IndiaTotalVaccinated += keys[i].value.total.vaccinated;
      if (keys[i].value.total.other != null) {
        this.IndiaTotalOther += keys[i].value.total.other;
      }
    }
    this.IndiaTotalVaccinated = this.IndiaTotalVaccinated / 2;
    this.IndiaTotalCases = this.IndiaTotalCases / 2;
    this.IndiaTotalDead = this.IndiaTotalDead / 2;
    this.IndiaTotalRecovered = this.IndiaTotalRecovered / 2;
    this.IndiaTotalOther = this.IndiaTotalOther / 2;

    this.IndiaTotalActive = (this.IndiaTotalCases - this.IndiaTotalDead - this.IndiaTotalRecovered - this.IndiaTotalOther)

    console.log("IndiaTotalVaccinated-" + this.IndiaTotalVaccinated)
    console.log("IndiaTotalCases-" + this.IndiaTotalCases)
    console.log("IndiaTotalDead-" + this.IndiaTotalDead)
    console.log("IndiaTotalRecovered-" + this.IndiaTotalRecovered)
    console.log("IndiaTotalOther-" + this.IndiaTotalOther)
    console.log("IndiaTotalActive-" + this.IndiaTotalActive)

  }


  getNews() {
    this.DashSer.News().subscribe((Response) => {

      this.News = Response.reverse();
      console.log(this.News)
      this.setLastUpdate(this.News[0].timestamp)
    },
      (Error) => {
        console.error("Error");
      });
  }

  setMapColor(data){
    let keys = [];
    for (let key in data) {
      keys.push({ key, value: data[key] });
    }
  }

  setLastUpdate(timestamp){
    let unix_timestamp = timestamp
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var sec =  "0"+date.getSeconds();
    var tdate= this.monthfinder(date.getMonth()) + " " + date.getDate()
    var formattedTime =tdate +' , ' +  hours + ':' + minutes.substr(-2) + ":" + sec.substr(-2);
   this.IndiaLastUpdateTime=formattedTime;
  }


  newsupdate(news) {
    return (news.replace('/n', '  |  '))
  }


}


