import { Component, OnInit, Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    "(window:click)": "closemenu()"
  }
})
export class NavbarComponent implements OnInit {

  constructor(public nav:AppComponent) { }
  menu:boolean=false;

  ngOnInit(): void {
  }

  jsmenu(event){
    event.stopPropagation();
    if(!this.menu){
     document.getElementById('jsmenu').setAttribute("style", "visibility:visible;opacity:1;transition: visibility .1s, opacity .1s linear;")
     this.menu=true;
    }
    else{
     document.getElementById('jsmenu').setAttribute("style", "visibility:hidden;opacity:0;transition: visibility .1s, opacity .1s linear;" )
     this.menu=false;
    }
   }
   closemenu(){
    document.getElementById('jsmenu').setAttribute("style", "visibility:hidden;opacity:0;transition: visibility .1s, opacity .1s linear;" )
    this.menu=false;
   }


}
