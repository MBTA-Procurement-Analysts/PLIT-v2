import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Po } from '../models/po';

@Injectable({
  providedIn: 'root'
})
export class PoService {
  private posUrl = 'http://localhost:3000/api/POPA';
  private poUrl = 'http://localhost:3000/api/po/'

  constructor(
    private http: HttpClient
  ) { }

  getPos(): Observable<Po[]> {
    return this.http.get<Po[]>(this.posUrl);
  }

  getPo(id: string): Observable<Po> {
    return this.http.get<Po>(this.poUrl + id);
  }
}
