import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Req } from '../models/req';

@Injectable({
  providedIn: 'root'
})
export class ReqService {
  private reqUrl = 'http://localhost:3000/api/dashboard/';

  constructor(
    private http: HttpClient
  ) { }

  getReqs(user: string): Observable<Req[]> {
    return this.http.get<Req[]>(this.reqUrl + user);
  }
}
