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
  TotalCases: any = 0;
  TotalActive: any = 0;
  TotalDead: any = 0;
  TotalRecovered: any = 0;
  TotalVaccinated: any = 0;
  TotalOther: any = 0;
  IndiaLastUpdate: any;
  IndiaLastUpdateTime: any;
  statewise:any=[];
  News: any;
  highst:any=0;
  currentState:any="All States";
  fullIndia:any;
  fullIndiaID:any;

  constructor(private nav: AppComponent, private DashSer: DashboardService) { }

  ngOnInit(): void {
    this.nav.routelinkr = 1;
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
    this.fullIndia=data;
    let keys = [];
    this.fullIndiaID=[];
    for (let key in data) {
      keys.push({ key, value: data[key] });
      this.fullIndiaID.push({ key, value: data[key] });
    }

    for(let i in keys){
      var ctotal;
      if(keys[i].key!="TT"){
        if(keys[i].value.total.other==null){
          ctotal=keys[i].value.total.confirmed-keys[i].value.total.deceased-keys[i].value.total.recovered
          this.statewise.push({ state: i , active: (ctotal)});
          if(ctotal>this.highst){
            this.highst=ctotal
          }
        }
        else{
          ctotal=keys[i].value.total.confirmed-keys[i].value.total.deceased-keys[i].value.total.recovered-keys[i].value.total.other
          this.statewise.push({ state: i , active: (ctotal)});
          if(ctotal>this.highst){
            this.highst=ctotal
          }
        }
      }
      else{
        this.statewise.push({ state: i , active: (0)});
      }
      
    }
    
    
    
     console.log(this.statewise)
    this.TotalVaccinated = data["TT"].total.vaccinated
    this.TotalCases = data["TT"].total.confirmed
    this.TotalDead = data["TT"].total.deceased
    this.TotalRecovered = data["TT"].total.recovered
    this.TotalOther = data["TT"].total.other
    this.TotalActive = (this.TotalCases - this.TotalDead - this.TotalRecovered - this.TotalOther)

  }


  getNews() {
    this.DashSer.News().subscribe((Response) => {

      this.News = Response.reverse();
      // console.log(this.News)
      this.setLastUpdate(this.News[0].timestamp)
    },
      (Error) => {
        console.error("Error");
      });
  }

  setMapColor(data){
    console.log(this.statewise)
    document.getElementById("AP").style.fill=this.setFill(this.statewise[1].active)
    document.getElementById("AR").style.fill=this.setFill(this.statewise[2].active)
    document.getElementById("AS").style.fill=this.setFill(this.statewise[3].active)
    document.getElementById("BR").style.fill=this.setFill(this.statewise[4].active)
    document.getElementById("CH").style.fill=this.setFill(this.statewise[5].active)
    document.getElementById("CT").style.fill=this.setFill(this.statewise[6].active)
    document.getElementById("DL").style.fill=this.setFill(this.statewise[7].active)
    document.getElementById("DN").style.fill=this.setFill(this.statewise[8].active)
    document.getElementById("GA").style.fill=this.setFill(this.statewise[9].active)
    document.getElementById("GJ").style.fill=this.setFill(this.statewise[10].active)
    document.getElementById("HP").style.fill=this.setFill(this.statewise[11].active)
    document.getElementById("HR").style.fill=this.setFill(this.statewise[12].active)
    document.getElementById("JH").style.fill=this.setFill(this.statewise[13].active)
    document.getElementById("JK").style.fill=this.setFill(this.statewise[14].active)
    document.getElementById("KA").style.fill=this.setFill(this.statewise[15].active)
    document.getElementById("KL").style.fill=this.setFill(this.statewise[16].active)
    document.getElementById("LD").style.fill=this.setFill(this.statewise[18].active)
    document.getElementById("MH").style.fill=this.setFill(this.statewise[19].active)
    document.getElementById("ML").style.fill=this.setFill(this.statewise[20].active)
    document.getElementById("MN").style.fill=this.setFill(this.statewise[21].active)
    document.getElementById("MP").style.fill=this.setFill(this.statewise[22].active)
    document.getElementById("MZ").style.fill=this.setFill(this.statewise[23].active)
    document.getElementById("NL").style.fill=this.setFill(this.statewise[24].active)
    document.getElementById("OR").style.fill=this.setFill(this.statewise[25].active)
    document.getElementById("PB").style.fill=this.setFill(this.statewise[26].active)
    document.getElementById("PY").style.fill=this.setFill(this.statewise[27].active)
    document.getElementById("RJ").style.fill=this.setFill(this.statewise[28].active)
    document.getElementById("SK").style.fill=this.setFill(this.statewise[29].active)
    document.getElementById("TG").style.fill=this.setFill(this.statewise[30].active)
    document.getElementById("TN").style.fill=this.setFill(this.statewise[31].active)
    document.getElementById("TR").style.fill=this.setFill(this.statewise[32].active)
    document.getElementById("UP").style.fill=this.setFill(this.statewise[34].active)
    document.getElementById("UT").style.fill=this.setFill(this.statewise[35].active)
    document.getElementById("WB").style.fill=this.setFill(this.statewise[36].active)
  }

  setMapGrey(){
    console.log(this.statewise)
    document.getElementById("AP").style.fill="grey"
    document.getElementById("AR").style.fill="grey"
    document.getElementById("AS").style.fill="grey"
    document.getElementById("BR").style.fill="grey"
    document.getElementById("CH").style.fill="grey"
    document.getElementById("CT").style.fill="grey"
    document.getElementById("DL").style.fill="grey"
    document.getElementById("DN").style.fill="grey"
    document.getElementById("GA").style.fill="grey"
    document.getElementById("GJ").style.fill="grey"
    document.getElementById("HP").style.fill="grey"
    document.getElementById("HR").style.fill="grey"
    document.getElementById("JH").style.fill="grey"
    document.getElementById("JK").style.fill="grey"
    document.getElementById("KA").style.fill="grey"
    document.getElementById("KL").style.fill="grey"
    document.getElementById("LD").style.fill="grey"
    document.getElementById("MH").style.fill="grey"
    document.getElementById("ML").style.fill="grey"
    document.getElementById("MN").style.fill="grey"
    document.getElementById("MP").style.fill="grey"
    document.getElementById("MZ").style.fill="grey"
    document.getElementById("NL").style.fill="grey"
    document.getElementById("OR").style.fill="grey"
    document.getElementById("PB").style.fill="grey"
    document.getElementById("PY").style.fill="grey"
    document.getElementById("RJ").style.fill="grey"
    document.getElementById("SK").style.fill="grey"
    document.getElementById("TG").style.fill="grey"
    document.getElementById("TN").style.fill="grey"
    document.getElementById("TR").style.fill="grey"
    document.getElementById("UP").style.fill="grey"
    document.getElementById("UT").style.fill="grey"
    document.getElementById("WB").style.fill="grey"
  }

  setFill(total){
    // console.log(state)
    if(total>=(500000)){
      return("#FF0000")
    }
    else if(total>=(400000)){
      return("#FF2300")
    }
    else if(total>=300000){
      return("#FF4600")
    }
    else if(total>=200000){
      return("#FF6900")
    }
    else if(total>=100000){
      return("#FF8C00")
    }
    else if(total>=50000){
      return("#FFAF00")
    }
    else if(total>=30000){
      return("#FFD300")
    }
    else if(total>=10000){
      return("#FFF600")
    }
    else if(total>=5000){
      return("#D4FF00")
    }
    else{
      return("#47FF00")
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
    return (news.replace('\n', '  ~  '))
  }


  /* ---------- MAP CLICK ------------------- */
  stateclick(event){
    this.setMapGrey();
    console.log(event)
    document.getElementById(event.srcElement.attributes.id.value).style.fill="#FF4600";
    var state=event.srcElement.attributes.id.value;
    this.currentState=event.srcElement.attributes.title.value;
    this.TotalCases=this.fullIndia[state].total.confirmed;
    this.TotalDead=this.fullIndia[state].total.deceased;
    this.TotalRecovered=this.fullIndia[state].total.confirmed;
    this.TotalVaccinated=this.fullIndia[state].total.vaccinated;
    if(this.fullIndia[state].total.other!=null){
      this.TotalActive=this.fullIndia[state].total.confirmed-this.fullIndia[state].total.recovered-this.fullIndia[state].total.other-this.fullIndia[state].total.deceased;
    }
    else{
      this.TotalActive=this.fullIndia[state].total.confirmed-this.fullIndia[state].total.recovered-this.fullIndia[state].total.deceased;
    }
  }
}


