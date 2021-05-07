import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  IN_API_ENDPOINT:any="https://api.covid19india.org"
  WD_API_ENDPOINT:any="https://disease.sh/v3/covid-19"

  constructor(private http: HttpClient) { }

  IndiaData(): Observable<any>
  {
    return this.http.get(this.IN_API_ENDPOINT+"/v4/min/data.min.json");
  }
  News(): Observable<any>
  {
    return this.http.get(this.IN_API_ENDPOINT+"/updatelog/log.json");
  }
  Timeseries(): Observable<any>
  {
    return this.http.get(this.IN_API_ENDPOINT+"/v4/min/timeseries.min.json");
  }

  WorldData(): Observable<any>
  {
    return this.http.get(this.WD_API_ENDPOINT+"/all");
  }
  CountryData(): Observable<any>
  {
    return this.http.get(this.WD_API_ENDPOINT+"/countries");
  }
}
