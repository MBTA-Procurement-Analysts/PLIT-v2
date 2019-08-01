import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl =  environment.apiUrl + 'dashboard/';
  private updatedUrl = environment.apiUrl + 'update/dashboard';

  constructor(
    private http: HttpClient
  ) { }

  getDashboard(user: string): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardUrl + user);
  }

  getUpdatedTime(): Observable<any> {
    return this.http.get<any>(this.updatedUrl);
  }
}
