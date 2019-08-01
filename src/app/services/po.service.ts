import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Po } from '../models/po';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoService {
  private posUrl =   environment.apiUrl + 'POPA';
  private poUrl =   environment.apiUrl + 'po/';

  constructor(
    private http: HttpClient
  ) { }

  getPos(): Observable<Po[]> {
    this.http.get<Po[]>(this.posUrl).subscribe(
      pos => console.log(pos)
    );
    return this.http.get<Po[]>(this.posUrl);
  }

  getPo(id: string): Observable<Po> {
    return this.http.get<Po>(this.poUrl + id);
  }
}
