import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Timeline, TimelineEvent } from '../models/timeline';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private byPOUrl = environment.apiUrl + 'timeline/po/';
  private byREQUrl = environment.apiUrl + 'timeline/req/';

  constructor(private http: HttpClient) { }

  getbyPO(poNum: string, BUnit: string): Observable<Timeline> {
    return this.http.get<Timeline>(this.byPOUrl + poNum + "/" + BUnit );
  }

  getbyReq(reqNum: string, BUnit: string): Observable<Timeline> {
    return this.http.get<Timeline>(this.byREQUrl + reqNum + "/" + BUnit);
  }
}
