import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatesComponent } from './components/states/states.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorldwideComponent } from './components/worldwide/worldwide.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { CowinComponent } from './components/cowin/cowin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StatesComponent,
    WorldwideComponent,
    AboutComponent,
    CowinComponent,
  ],
  imports: [
    HttpClientModule,
    // HttpClient,
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    WavesModule,
    ButtonsModule
  ],
  providers: [
    {
     provide: NG_SCROLLBAR_OPTIONS,
      useValue: {
        scrollAuditTime: 20,
        visibility: "hover",
        compact: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
