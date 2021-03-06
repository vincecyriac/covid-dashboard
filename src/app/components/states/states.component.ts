import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from 'src/app/service/dashboard.service';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Color } from 'ng2-charts';

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
  statewise: any = [];
  News: any;
  highst: any = 0;
  currentState: any = "All States";
  fullIndia: any;
  fullIndiaID: any;
  today: any;
  dayConfirmed: any;
  dayRecovered: any;
  dayDeceased: any;
  dayVaccinated: any;
  dayTested: any;
  maxDate: any;
  minDate: any = { year: 2020, month: 1, day: 1 };
  IndiaDaywise: any;
  currentStateId: any = "0";
  loaded: boolean;
  districts: any = ["Please select a state"];
  disConfirmed: any = 0;
  disRecovered: any = 0;
  disDeceased: any = 0;
  disVaccinated: any = 0;
  disTested: any = 0;
  disActive: any = 0;
  disTConfirmed: any = 0;
  disTRecovered: any = 0;
  disTDeceased: any = 0;
  disDisabled: any;
  confirmesData: any = [];
  recoveredData: any = [];
  deathData: any = [];
  vaccine1data: any = [];
  vaccine2data: any = [];
  highstConfirmed:any=0;



  constructor(private nav: AppComponent, private DashSer: DashboardService) { }


  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
        borderWidth: 0,
      }
    },
    legend: {
      position: 'top',
      onClick: (e) => e.stopPropagation()
    },
  };
  public lineChartLabels = [];
  public lineChartType = 'line';
  public lineChartLegend = true;

  public alineChartData = [];
  public alineChartLabels = [];


  public clineChartData = []
  public clineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public rlineChartData = []
  public rlineChartColors: Color[] = [
    {
      backgroundColor: 'rgb(103, 223, 73, 0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public dlineChartData = []
  public dlineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public vlineChartData = []
  public vlineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(49, 62, 240,0.2)',
      borderColor: 'rgb(0, 17, 255)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(0, 245, 253, 0.2)',
      borderColor: 'rgba(0, 245, 253,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];



  ngOnInit(): void {
    this.disDisabled = true;
    this.loaded = true;
    this.nav.routelinkr = 1;
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    const fDateArr = this.today.split('-');
    const fyear: number = parseInt(fDateArr[0]);
    const fmonth: number = parseInt(fDateArr[1]);
    const fday: number = parseInt(fDateArr[2]);
    this.maxDate = { year: fyear, month: fmonth, day: fday };
    this.DatePicker.controls['date'].setValue(this.maxDate);
    this.getIndiaData();
    this.getNews();
    this.IndiaTimeseries();
    this.getLinechartLabel(this.today);
  }


  ngOnDestroy() {
    this.nav.routelinkr = 2;
  }


  DatePicker = new FormGroup({
    date: new FormControl()
  });

  timestampConvert(timestamp) {
    let unix_timestamp = timestamp
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var tdate = this.monthfinder(date.getMonth()) + " " + date.getDate()
    var formattedTime = tdate + ' , ' + hours + ':' + minutes.substr(-2);
    return (formattedTime);
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


  getIndiaData() {
    this.DashSer.IndiaData().subscribe((Response) => {
      this.statewise = [];
      this.fullIndia = [];
      this.fullIndiaID = [];

      this.currentState = "All States"
      this.currentStateId = "0";
      this.getTotal(Response);
      this.setMapColor(Response);

    },
      (Error) => {
        console.error("Error");
      });
  }


  getTotal(data) {
    this.fullIndia = data;
    let keys = [];
    this.fullIndiaID = [];
    for (let key in data) {
      keys.push({ key, value: data[key] });
      this.fullIndiaID.push({ key, value: data[key] });
    }

    for (let i in keys) {
      var ctotal;
      if (keys[i].key != "TT") {
        if (keys[i].value.total.other == null) {
          ctotal = keys[i].value.total.confirmed - keys[i].value.total.deceased - keys[i].value.total.recovered
          this.statewise.push({ state: i, active: (ctotal) });
          if (ctotal > this.highst) {
            this.highst = ctotal
          }
        }
        else {
          ctotal = keys[i].value.total.confirmed - keys[i].value.total.deceased - keys[i].value.total.recovered - keys[i].value.total.other
          this.statewise.push({ state: i, active: (ctotal) });
          if (ctotal > this.highst) {
            this.highst = ctotal
          }
        }
      }
      else {
        this.statewise.push({ state: i, active: (0) });
      }

    }


    this.TotalVaccinated = data["TT"].total.vaccinated2
    this.TotalCases = data["TT"].total.confirmed
    this.TotalDead = data["TT"].total.deceased
    this.TotalRecovered = data["TT"].total.recovered
    this.TotalOther = data["TT"].total.other
    this.TotalActive = (this.TotalCases - this.TotalDead - this.TotalRecovered - this.TotalOther)
  }


  getNews() {
    this.DashSer.News().subscribe((Response) => {

      this.News = Response.reverse();
      this.setLastUpdate(this.News[0].timestamp)
    },
      (Error) => {
        console.error("Error");
      });
  }

  setMapColor(data) {
    for (let index = 0; index < 37; index++) {
      if(this.statewise[index].active > this.highstConfirmed){
        this.highstConfirmed = this.statewise[index].active
      }
    }
    document.getElementById("AP").style.fill = this.setFill(this.statewise[1].active)
    document.getElementById("AR").style.fill = this.setFill(this.statewise[2].active)
    document.getElementById("AS").style.fill = this.setFill(this.statewise[3].active)
    document.getElementById("BR").style.fill = this.setFill(this.statewise[4].active)
    document.getElementById("CH").style.fill = this.setFill(this.statewise[5].active)
    document.getElementById("CT").style.fill = this.setFill(this.statewise[6].active)
    document.getElementById("DL").style.fill = this.setFill(this.statewise[7].active)
    document.getElementById("DN").style.fill = this.setFill(this.statewise[8].active)
    document.getElementById("GA").style.fill = this.setFill(this.statewise[9].active)
    document.getElementById("GJ").style.fill = this.setFill(this.statewise[10].active)
    document.getElementById("HP").style.fill = this.setFill(this.statewise[11].active)
    document.getElementById("HR").style.fill = this.setFill(this.statewise[12].active)
    document.getElementById("JH").style.fill = this.setFill(this.statewise[13].active)
    document.getElementById("JK").style.fill = this.setFill(this.statewise[14].active)
    document.getElementById("KA").style.fill = this.setFill(this.statewise[15].active)
    document.getElementById("KL").style.fill = this.setFill(this.statewise[16].active)
    document.getElementById("LD").style.fill = this.setFill(this.statewise[18].active)
    document.getElementById("MH").style.fill = this.setFill(this.statewise[19].active)
    document.getElementById("ML").style.fill = this.setFill(this.statewise[20].active)
    document.getElementById("MN").style.fill = this.setFill(this.statewise[21].active)
    document.getElementById("MP").style.fill = this.setFill(this.statewise[22].active)
    document.getElementById("MZ").style.fill = this.setFill(this.statewise[23].active)
    document.getElementById("NL").style.fill = this.setFill(this.statewise[24].active)
    document.getElementById("OR").style.fill = this.setFill(this.statewise[25].active)
    document.getElementById("PB").style.fill = this.setFill(this.statewise[26].active)
    document.getElementById("PY").style.fill = this.setFill(this.statewise[27].active)
    document.getElementById("RJ").style.fill = this.setFill(this.statewise[28].active)
    document.getElementById("SK").style.fill = this.setFill(this.statewise[29].active)
    document.getElementById("TG").style.fill = this.setFill(this.statewise[30].active)
    document.getElementById("TN").style.fill = this.setFill(this.statewise[31].active)
    document.getElementById("TR").style.fill = this.setFill(this.statewise[32].active)
    document.getElementById("UP").style.fill = this.setFill(this.statewise[34].active)
    document.getElementById("UT").style.fill = this.setFill(this.statewise[35].active)
    document.getElementById("WB").style.fill = this.setFill(this.statewise[36].active)
  }

  setMapGrey() {
    document.getElementById("AP").style.fill = "grey"
    document.getElementById("AR").style.fill = "grey"
    document.getElementById("AS").style.fill = "grey"
    document.getElementById("BR").style.fill = "grey"
    document.getElementById("CH").style.fill = "grey"
    document.getElementById("CT").style.fill = "grey"
    document.getElementById("DL").style.fill = "grey"
    document.getElementById("DN").style.fill = "grey"
    document.getElementById("GA").style.fill = "grey"
    document.getElementById("GJ").style.fill = "grey"
    document.getElementById("HP").style.fill = "grey"
    document.getElementById("HR").style.fill = "grey"
    document.getElementById("JH").style.fill = "grey"
    document.getElementById("JK").style.fill = "grey"
    document.getElementById("KA").style.fill = "grey"
    document.getElementById("KL").style.fill = "grey"
    document.getElementById("LD").style.fill = "grey"
    document.getElementById("MH").style.fill = "grey"
    document.getElementById("ML").style.fill = "grey"
    document.getElementById("MN").style.fill = "grey"
    document.getElementById("MP").style.fill = "grey"
    document.getElementById("MZ").style.fill = "grey"
    document.getElementById("NL").style.fill = "grey"
    document.getElementById("OR").style.fill = "grey"
    document.getElementById("PB").style.fill = "grey"
    document.getElementById("PY").style.fill = "grey"
    document.getElementById("RJ").style.fill = "grey"
    document.getElementById("SK").style.fill = "grey"
    document.getElementById("TG").style.fill = "grey"
    document.getElementById("TN").style.fill = "grey"
    document.getElementById("TR").style.fill = "grey"
    document.getElementById("UP").style.fill = "grey"
    document.getElementById("UT").style.fill = "grey"
    document.getElementById("WB").style.fill = "grey"
  }

  setFill(total) {
    if (total >= (this.highstConfirmed*0.90)) {
      return ("#FF0000")
    }
    else if (total >= this.highstConfirmed*0.80) {
      return ("#FF2300")
    }
    else if (total >= this.highstConfirmed*0.70) {
      return ("#FF4600")
    }
    else if (total >= this.highstConfirmed*0.60) {
      return ("#FF6900")
    }
    else if (total >= this.highstConfirmed*0.50) {
      return ("#FF8C00")
    }
    else if (total >= this.highstConfirmed*0.40) {
      return ("#FFAF00")
    }
    else if (total >= this.highstConfirmed*0.30) {
      return ("#FFD300")
    }
    else if (total >= this.highstConfirmed*0.20) {
      return ("#FFF600")
    }
    else if (total >= this.highstConfirmed*0.10) {
      return ("#D4FF00")
    }
    else {
      return ("#47FF00")
    }
  }

  setLastUpdate(timestamp) {
    let unix_timestamp = timestamp
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var sec = "0" + date.getSeconds();
    var tdate = this.monthfinder(date.getMonth()) + " " + date.getDate()
    var formattedTime = tdate + ' , ' + hours + ':' + minutes.substr(-2) + ":" + sec.substr(-2);
    this.IndiaLastUpdateTime = formattedTime;
  }


  newsupdate(news) {
    return (news.replace(/\n/g, "<br/>"))
  }


  /* ---------- MAP CLICK ------------------- -- */
  stateclick(event) {
    this.setMapGrey();
    document.getElementById(event.srcElement.attributes.id.value).style.fill = "#FF4600";
    document.querySelector('select').selectedIndex = this.getstateid(event.srcElement.attributes.id.value)
    var state = event.srcElement.attributes.id.value;
    this.currentState = event.srcElement.attributes.title.value;
    this.currentStateId = state;
    this.TotalCases = this.fullIndia[state].total.confirmed;
    this.TotalDead = this.fullIndia[state].total.deceased;
    this.TotalRecovered = this.fullIndia[state].total.recovered;
    this.TotalVaccinated = this.fullIndia[state].total.vaccinated2;
    if (this.fullIndia[state].total.other != null) {
      this.TotalActive = this.fullIndia[state].total.confirmed - this.fullIndia[state].total.recovered - this.fullIndia[state].total.other - this.fullIndia[state].total.deceased;
    }
    else {
      this.TotalActive = this.fullIndia[state].total.confirmed - this.fullIndia[state].total.recovered - this.fullIndia[state].total.deceased;
    }
    this.GetDaywise(this.today, this.currentStateId);
    this.DatePicker.controls['date'].setValue(this.maxDate);
    this.pushDistricts(this.currentStateId);
    this.disDisabled = false;
    this.setChartData(state);
  }

  stateDropdown(event) {
    if (event.srcElement.value != 0) {
      var state = event.srcElement.value;
      this.setMapGrey();
      document.getElementById(state).style.fill = "#FF4600";
      this.currentState = this.getstate(state);
      this.currentStateId = state;
      this.TotalCases = this.fullIndia[state].total.confirmed;
      this.TotalDead = this.fullIndia[state].total.deceased;
      this.TotalRecovered = this.fullIndia[state].total.recovered;
      this.TotalVaccinated = this.fullIndia[state].total.vaccinated2;
      if (this.fullIndia[state].total.other != null) {
        this.TotalActive = this.fullIndia[state].total.confirmed - this.fullIndia[state].total.recovered - this.fullIndia[state].total.other - this.fullIndia[state].total.deceased;
      }
      else {
        this.TotalActive = this.fullIndia[state].total.confirmed - this.fullIndia[state].total.recovered - this.fullIndia[state].total.deceased;
      }
      // this.stateDaywise(state);
      this.GetDaywise(this.today, this.currentStateId);
      this.DatePicker.controls['date'].setValue(this.maxDate);
      this.pushDistricts(this.currentStateId);
      this.disDisabled = false;
      this.setChartData(state);
    }
    else {
      this.disDisabled = true;
      this.getIndiaData()
      this.GetDaywise(this.today, "0");
      // this.districts=[]
      this.districts = ["Please select a state"];
      this.disConfirmed = 0;
      this.disRecovered = 0;
      this.disDeceased = 0;
      this.disVaccinated = 0;
      this.disTested = 0;
      this.disActive = 0;
      this.disTConfirmed = 0;
      this.disTRecovered = 0;
      this.disTDeceased = 0;
      this.setChartData("TT");
    }

  }

  getstate(id) {
    switch (id) {
      case "AN": return ("Andaman Nicobar")
      case "AP": return ("Andhra Pradesh");
      case "AR": return ("Arunachal Pradesh");
      case "AS": return ("Assam");
      case "BR": return ("Bihar");
      case "CH": return ("Chandigarh");
      case "CT": return ("Chhattisgarh");
      case "DL": return ("Delhi");
      case "DN": return ("Dadra and Nagar Haveli");
      case "GA": return ("Goa");
      case "GJ": return ("Gujarat");
      case "HP": return ("Himachal Pradesh");
      case "HR": return ("Haryana");
      case "JH": return ("Jharkhand");
      case "JK": return ("Jammu and Kashmir");
      case "KA": return ("Karnataka");
      case "KL": return ("Kerala");
      case "LA": return ("Ladakh")
      case "LD": return ("Lakshadweep");
      case "MH": return ("Maharashtra");
      case "ML": return ("Meghalaya");
      case "MN": return ("Manipur");
      case "MP": return ("Madhya Pradesh");
      case "MZ": return ("Mizoram");
      case "NL": return ("Nagaland");
      case "OR": return ("Odisha");
      case "PB": return ("Punjab");
      case "PY": return ("Puducherry");
      case "RJ": return ("Rajasthan");
      case "SK": return ("Sikkim");
      case "TG": return ("Telangana");
      case "TN": return ("Tamil Nadu");
      case "TR": return ("Tripura");
      case "UP": return ("Uttar Pradesh");
      case "UT": return ("Uttarakhand");
      case "WB": return ("West Bengal");
    }

  }
  getstateid(id) {
    switch (id) {
      case "AP": return (1);
      case "AR": return (2);
      case "AS": return (3);
      case "BR": return (4);
      case "CH": return (5);
      case "CT": return (6);
      case "DL": return (7);
      case "DN": return (8);
      case "GA": return (9);
      case "GJ": return (10);
      case "HP": return (11);
      case "HR": return (12);
      case "JH": return (13);
      case "JK": return (14);
      case "KA": return (15);
      case "KL": return (16);
      case "LD": return (17);
      case "MH": return (18);
      case "ML": return (19);
      case "MN": return (20);
      case "MP": return (21);
      case "MZ": return (22);
      case "NL": return (23);
      case "OR": return (24);
      case "PB": return (25);
      case "PY": return (26);
      case "RJ": return (27);
      case "SK": return (28);
      case "TG": return (29);
      case "TN": return (30);
      case "TR": return (31);
      case "UP": return (32);
      case "UT": return (33);
      case "WB": return (34);
    }

  }

  getActive(confirmed, recovered, deceased, other) {
    if (other != null) {
      return (confirmed - recovered - deceased - other)
    }
    else {
      return (confirmed - recovered - deceased)
    }
  }

  getIndiaToday() {

    if (this.fullIndia["TT"].delta) {
      if (this.fullIndia["TT"].delta.vaccinated2) {
        this.dayVaccinated = this.fullIndia["TT"].delta.vaccinated2
      }
      else {
        this.dayVaccinated = 0
      }

      if (this.fullIndia["TT"].delta.confirmed) {
        this.dayConfirmed = this.fullIndia["TT"].delta.confirmed;
      }
      else {
        this.dayConfirmed = 0
      }

      if (this.fullIndia["TT"].delta.deceased) {
        this.dayDeceased = this.fullIndia["TT"].delta.deceased;
      }
      else {
        this.dayDeceased = 0
      }

      if (this.fullIndia["TT"].delta.recovered) {
        this.dayRecovered = this.fullIndia["TT"].delta.recovered;
      }
      else {
        this.dayRecovered = 0
      }
      if (this.fullIndia["TT"].delta.tested) {
        this.dayTested = this.fullIndia["TT"].delta.tested
      }
      else {
        this.dayTested = 0
      }
    }
    else {
      this.dayTested = 0;
      this.dayRecovered = 0;
      this.dayDeceased = 0;
      this.dayConfirmed = 0;
      this.dayVaccinated = 0;
    }



  }

  IndiaTimeseries() {

    this.DashSer.Timeseries().subscribe((Response) => {
      this.IndiaDaywise = Response;
      this.GetDaywise(this.today, "0")
      this.setChartData("TT");
      this.getAllData("TT")
      if (this.IndiaDaywise != null || this.fullIndia != null) {
        this.loaded = false;
      }

    },
      (Error) => {
        console.error("Error");
      });


  }

  GetDaywise(date, state) {
    if (state == "0") {
      var TTFul = this.IndiaDaywise["TT"].dates;
      if (TTFul[date]) {
        if (TTFul[date].delta) {
          if (TTFul[date].delta.vaccinated2) {
            this.dayVaccinated = TTFul[date].delta.vaccinated2
          }
          else {
            this.dayVaccinated = 0
          }

          if (TTFul[date].delta.confirmed) {
            this.dayConfirmed = TTFul[date].delta.confirmed;
          }
          else {
            this.dayConfirmed = 0
          }

          if (TTFul[date].delta.deceased) {
            this.dayDeceased = TTFul[date].delta.deceased;
          }
          else {
            this.dayDeceased = 0
          }

          if (TTFul[date].delta.recovered) {
            this.dayRecovered = TTFul[date].delta.recovered;
          }
          else {
            this.dayRecovered = 0
          }
          if (TTFul[date].delta.tested) {
            this.dayTested = TTFul[date].delta.tested
          }
          else {
            this.dayTested = 0
          }
        }
        else {
          this.dayTested = 0;
          this.dayRecovered = 0;
          this.dayDeceased = 0;
          this.dayConfirmed = 0;
          this.dayVaccinated = 0;
        }
      }
      else {
        this.dayTested = 0;
        this.dayRecovered = 0;
        this.dayDeceased = 0;
        this.dayConfirmed = 0;
        this.dayVaccinated = 0;
      }

    }
    else {
      var TTFul = this.IndiaDaywise[state].dates;


      if (TTFul[date]) {
        if (TTFul[date].delta) {
          if (TTFul[date].delta.vaccinated2) {
            this.dayVaccinated = TTFul[date].delta.vaccinated2
          }
          else {
            this.dayVaccinated = 0
          }

          if (TTFul[date].delta.confirmed) {
            this.dayConfirmed = TTFul[date].delta.confirmed;
          }
          else {
            this.dayConfirmed = 0
          }

          if (TTFul[date].delta.deceased) {
            this.dayDeceased = TTFul[date].delta.deceased;
          }
          else {
            this.dayDeceased = 0
          }

          if (TTFul[date].delta.recovered) {
            this.dayRecovered = TTFul[date].delta.recovered;
          }
          else {
            this.dayRecovered = 0
          }
          if (TTFul[date].delta.tested) {
            this.dayTested = TTFul[date].delta.tested
          }
          else {
            this.dayTested = 0
          }
        }
        else {
          this.dayTested = 0;
          this.dayRecovered = 0;
          this.dayDeceased = 0;
          this.dayConfirmed = 0;
          this.dayVaccinated = 0;
        }
      }
      else {
        this.dayTested = 0;
        this.dayRecovered = 0;
        this.dayDeceased = 0;
        this.dayConfirmed = 0;
        this.dayVaccinated = 0;
      }
    }
  }
  dateselect(date) {
    let Selecteddate = date.year + '-' + ('0' + date.month).slice(-2) + '-' + ('0' + date.day).slice(-2);
    this.GetDaywise(Selecteddate, this.currentStateId);
  }


  pushDistricts(state) {
    this.districts = []
    var disData = this.fullIndia[state].districts
    var keys = [];
    for (let key in disData) {
      keys.push({ key, value: disData[key] });
    }
    keys.forEach(element => {
      this.districts.push(element.key)
    });
    this.getDisData(state, this.districts[0])
  }

  getDisData(state, district) {
    var AllDisData = this.fullIndia[state].districts;

    if (AllDisData[district].total.confirmed) {
      this.disConfirmed = AllDisData[district].total.confirmed;
    }
    else {
      this.disConfirmed = 0;
    }

    if (AllDisData[district].total.deceased) {
      this.disDeceased = AllDisData[district].total.deceased;
    }
    else {
      this.disDeceased = 0;
    }

    if (AllDisData[district].total.recovered) {
      this.disRecovered = AllDisData[district].total.recovered;
    }
    else {
      this.disRecovered = 0;
    }

    if (AllDisData[district].total.recovered) {
      this.disRecovered = AllDisData[district].total.recovered;
    }
    else {
      this.disRecovered = 0;
    }

    if (AllDisData[district].total.tested) {
      this.disTested = AllDisData[district].total.tested;
    }
    else {
      this.disTested = 0;
    }
    if (AllDisData[district].total.vaccinated2) {
      this.disVaccinated = AllDisData[district].total.vaccinated2;
    }
    else {
      this.disVaccinated = 0;
    }

    if (AllDisData[district].delta) {
      if (AllDisData[district].delta.confirmed) {
        this.disTConfirmed = AllDisData[district].delta.confirmed;
      }
      else {
        this.disTConfirmed = 0;
      }

      if (AllDisData[district].delta.deceased) {
        this.disTDeceased = AllDisData[district].delta.deceased;
      }
      else {
        this.disTDeceased = 0;
      }

      if (AllDisData[district].delta.recovered) {
        this.disTRecovered = AllDisData[district].delta.recovered;
      }
      else {
        this.disTRecovered = 0;
      }

    }
    else {
      this.disTConfirmed = 0;
      this.disTRecovered = 0;
      this.disTDeceased = 0;
    }
  }
  districtDropdown(event) {

    var selectedDistrict = event.srcElement.value;
    this.getDisData(this.currentStateId, selectedDistrict)
  }

  getLinechartLabel(today) {
    this.lineChartLabels = []
    var tempDateArr: any = []
    const fDateArr = today.split('-');
    var fyear: number = parseInt(fDateArr[0]);
    var fmonth: number = parseInt(fDateArr[1]);
    var fday: number = parseInt(fDateArr[2]);
    var prevday: any;

    for (let i = 1; i <= 10; i++) {
      if (fday - i == 0) {
        fmonth -= 1
        if (fmonth == 1 || fmonth == 3 || fmonth == 5 || fmonth == 7 || fmonth == 8 || fmonth == 10 || fmonth == 12) {
          fday = 31
        }
        else if (fmonth == 4 || fmonth == 6 || fmonth == 9 || fmonth == 11) {
          fday = 30
        }
        else if (fmonth == 2) {
          fday = 28
        }
        prevday = fyear + '-' + ('0' + fmonth).slice(-2) + '-' + ('0' + fday).slice(-2)
        tempDateArr.push(prevday)
        for (let j = 1; j <= 10 - i; j++) {
          prevday = fyear + '-' + ('0' + fmonth).slice(-2) + '-' + ('0' + (fday - j)).slice(-2)
          tempDateArr.push(prevday)
        }
        break;
      }
      else if (fday - i >= 1) {
        prevday = fyear + '-' + ('0' + fmonth).slice(-2) + '-' + ('0' + (fday - i)).slice(-2)
        tempDateArr.push(prevday)
      }
    }
    this.lineChartLabels = tempDateArr.reverse();
  }
  setChartData(state) {
    this.confirmesData = []
    this.recoveredData = []
    this.vaccine1data = []
    this.vaccine2data = []
    this.deathData = []
    var dayData: any;
    var StateData = this.IndiaDaywise[state].dates


    for (let i = 0; i < 10; i++) {
      dayData = StateData[this.lineChartLabels[i]]
      dayData?.delta.confirmed ? this.confirmesData.push(dayData?.delta.confirmed) : this.confirmesData.push(0)
      dayData?.delta.recovered ? this.recoveredData.push(dayData?.delta.recovered) : this.recoveredData.push(0)
      dayData?.delta.deceased ? this.deathData.push(dayData?.delta.deceased) : this.deathData.push(0)
      dayData?.delta.vaccinated1 ? this.vaccine1data.push(dayData?.delta.vaccinated1) :  this.vaccine1data.push(0)
      dayData?.delta.vaccinated2 ? this.vaccine2data.push(dayData?.delta.vaccinated2) : this.vaccine2data.push(0)
    }

    this.clineChartData = [
      { data: this.confirmesData, label: 'Confirmed' }
    ];
    this.rlineChartData = [
      { data: this.recoveredData, label: 'Recovered' }
    ];
    this.dlineChartData = [
      { data: this.deathData, label: 'Deceased' }
    ];
    this.vlineChartData = [
      { data: this.vaccine1data, label: 'Dose 1' },
      { data: this.vaccine2data, label: 'Dose 2' }
    ];
  }
  getAllData(state) {
    var dateData = this.IndiaDaywise[state].dates
    var confirmed: any = [];
    var dates: any = [];
    for (let key in dateData) {
      dates.push(key)
      confirmed.push(dateData[key].delta.confirmed)
    }
    this.alineChartData = [
      {data : confirmed.slice(-100), label : 'confirmed'}
    ]
    this.alineChartLabels = dates.slice(-100)
  }
 
  
}


