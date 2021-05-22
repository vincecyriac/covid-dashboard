import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CowinService } from 'src/app/service/cowin.service';

@Component({
  selector: 'app-cowin',
  templateUrl: './cowin.component.html',
  styleUrls: ['./cowin.component.css']
})
export class CowinComponent implements OnInit {
  states: any;
  districts: any;
  selectedDisId: any;
  centers:any=[];
  sessions:any=[];
  welcomeinfo:boolean=true;
  centerCount:number=0;

  constructor(private cowinSer: CowinService) { }

  ngOnInit(): void {
    this.getState();
    //this.getSlotdata(formatDate(new Date(), 'dd-MM-yyyy', 'en'));
  }

  getState() {
    this.cowinSer.getStates().subscribe((Response) => {
      this.states = Response.states;
    },
      (Error) => {
        console.error("Error");
      });
  }

  getDistrict(id) {
    this.cowinSer.getDis(id).subscribe((Response) => {
      this.districts = Response.districts;
    },
      (Error) => {
        console.error("Error");
      });
  }

  getSlotdata(date) {
    this.centers=[];
    this.cowinSer.slotByDis(this.selectedDisId,date).subscribe((Response) => {
      this.centers=Response.centers;
      this.centerCount=this.centers.length;
      console.log(this.centerCount)
    },
      (Error) => {
        console.error("Error");
      });
  }


  stSelect(event) {
    this.districts = [];
    this.getDistrict(event.srcElement.value);
  }
  dtSelect(event) {
    this.selectedDisId = event.srcElement.value;
    this.getSlotdata(formatDate(new Date(), 'dd-MM-yyyy', 'en'));
    this.welcomeinfo=false;
  }

  findSessions(id){
    this.sessions=[];
    this.centers.forEach(element => {
      if(id == element.center_id){
        this.sessions=element.sessions;
      }
    });
  }

  findAgeGroup(age){
    if(age>=45){
      return("45+")
    }
    else if(age>=18){
      return("18-45")
    }
    else{
      return("0-18")
    }
  }
  availability(id){
    var ssns=[];
    var count:number=0;
    this.centers.forEach(element => {
      if(id==element.center_id){
        ssns=element.sessions;
      }
    });
    ssns.forEach(element => {
      count+=element.available_capacity  
    });
    return(count)
  }
}
