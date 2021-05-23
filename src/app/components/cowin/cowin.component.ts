import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  disclick:boolean=true;
  pinclick:boolean=false;
  submitted = false;
  loaded: boolean;

  constructor(private cowinSer: CowinService) { }

  byDis = new FormGroup({
    state: new FormControl(0),
    dist: new FormControl(0)
  });
  byPin = new FormGroup({
    pin: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')])
  });

  ngOnInit(): void {
    this.getState();
    this.loaded = true;
    //this.getSlotdatabyDis(formatDate(new Date(), 'dd-MM-yyyy', 'en'));
  }

  getState() {
    this.cowinSer.getStates().subscribe((Response) => {
      this.states = Response.states;
      if(this.states){
        this.loaded = false;
      }
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

  getSlotdatabyDis(date) {
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
  getSlotdatabyPin(form){
    this.centers=[];
    this.submitted=true;
    if (this.byPin.valid){
      this.welcomeinfo=false;
      this.cowinSer.slotByPin(form.value.pin,formatDate(new Date(), 'dd-MM-yyyy', 'en')).subscribe((Response) => {
        this.centers=Response.centers;
        this.centerCount=this.centers.length;
      },
        (Error) => {
          console.error("Error");
        });
    }
  }


  stSelect(event) {
    this.districts = [];
    this.getDistrict(event.srcElement.value);
    this.byDis.controls['dist'].setValue(0);
  }
  dtSelect(event) {
    this.selectedDisId = event.srcElement.value;
    this.getSlotdatabyDis(formatDate(new Date(), 'dd-MM-yyyy', 'en'));
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

  ByPinClick(){
    if(!this.pinclick){
      this.centers=[];
      this.welcomeinfo=true;
    }
    this.disclick=false;
    this.pinclick=true;
  }
  ByDisClick(){
    if(!this.disclick){
      this.centers=[];
      this.welcomeinfo=true;
      this.districts=[];
      this.byDis.controls['state'].setValue(0);
      this.byDis.controls['dist'].setValue(0);
    }
    this.disclick=true;
    this.pinclick=false;
  }
}
