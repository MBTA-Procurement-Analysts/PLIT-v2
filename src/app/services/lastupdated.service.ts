import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LastUpdatedInfo } from '../models/lastupdated';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LastupdatedService {
  private luUrl = environment.apiUrl + 'lu/';

  constructor(private http: HttpClient) { }

  getLU(dbname: string): Observable<LastUpdatedInfo> {
    return this.http.get<LastUpdatedInfo>(this.luUrl + dbname);
  }
}
