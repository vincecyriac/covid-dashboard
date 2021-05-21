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

  constructor(private cowinSer: CowinService) { }

  ngOnInit(): void {
    this.getState();
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

  getSlotdata() {
    this.cowinSer.slotByDis(this.selectedDisId).subscribe((Response) => {
      console.log(Response)
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
    console.log(event.srcElement.value);
    this.selectedDisId = event.srcElement.value;
    this.getSlotdata();
  }

}
