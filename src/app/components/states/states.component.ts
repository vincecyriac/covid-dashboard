import { Component, OnInit } from '@angular/core';
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
  IndiaLastUpdateDate: any;
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

  getIndiaData() {
    this.DashSer.IndiaData().subscribe((Response) => {
      console.log(Response)
      this.IndiaLastUpdate = Response.KL.meta.last_updated;
      console.log(this.IndiaLastUpdate)
      let tempArr = this.IndiaLastUpdate.split('T')
      console.log(tempArr)
      this.IndiaLastUpdateDate = tempArr[0]
      this.IndiaLastUpdateTime = tempArr[1].slice(0, 8)
      console.log(this.IndiaLastUpdateTime)
      this.getTotal(Response)
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

      this.News = Response;
      console.log(this.News)

      // for (const element of Response)
      //   {
      //     this.News.push(element);
      //   }
    },
      (Error) => {
        console.error("Error");
      });
  }
  timestamp(stamp) {
    var timestamp = stamp
    var date = new Date(timestamp);

    return( date.getDate() +
      "/" + (date.getMonth() + 1) +
      "/" + date.getFullYear() +
      " " + date.getHours() +
      ":" + date.getMinutes() +
      ":" + date.getSeconds());
  }

  newsupdate(news){
    return (news.replace(/\n/g, '; '))
  }
}
