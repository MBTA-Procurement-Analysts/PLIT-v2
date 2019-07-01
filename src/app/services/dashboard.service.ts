import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = 'http://localhost:3000/api/dashboard/';

  constructor(
    private http: HttpClient
  ) { }

  getDashboard(user: string): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardUrl + user);
  }
}
