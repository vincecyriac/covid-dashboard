import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_ENDPOINT:any="https://api.covid19india.org"

  constructor(private http: HttpClient) { }

  IndiaData(): Observable<any>
  {
    return this.http.get(this.API_ENDPOINT+"/v4/min/data.min.json");
  }
  News(): Observable<any>
  {
    return this.http.get(this.API_ENDPOINT+"/updatelog/log.json");
  }
  Timeseries(): Observable<any>
  {
    return this.http.get(this.API_ENDPOINT+"/v4/min/timeseries.min.json");
  }
}
