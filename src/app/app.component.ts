import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import {Router,NavigationEnd } from '@angular/router';
declare let ga: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'covid-dashboard';
  routelinkr:any;
  constructor(public router: Router) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
  
}
