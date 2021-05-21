import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CowinService {
  IN_API_ENDPOINT:any="https://cdn-api.co-vin.in/api/"

  constructor(private http: HttpClient) { }
  getStates(): Observable<any>
  {
    return this.http.get(this.IN_API_ENDPOINT+"v2/admin/location/states");
  }  
  getDis(id): Observable<any>
  {
    return this.http.get(this.IN_API_ENDPOINT+"v2/admin/location/districts/"+id);
  }  
  slotByDis(id): Observable<any>
  {
    return this.http.get(this.IN_API_ENDPOINT+"v2/appointment/sessions/public/calendarByDistrict?district_id="+id+"&date=21-05-2021");
  } 
}
