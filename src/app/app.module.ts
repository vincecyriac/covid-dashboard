import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatesComponent } from './components/states/states.component';
import { DistrictsComponent } from './components/districts/districts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StatesComponent,
    DistrictsComponent
  ],
  imports: [
    HttpClientModule,
    // HttpClient,
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
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
