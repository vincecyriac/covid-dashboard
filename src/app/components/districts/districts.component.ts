import { Component, OnInit} from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

  constructor(private nav:AppComponent) { }

  ngOnInit(): void {
    this.nav.routelinkr=2;
    console.log(this.nav.routelinkr)
  }
  ngOnDestroy(){
    this.nav.routelinkr=1;
    console.log(this.nav.routelinkr)
  }

}
