import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Req, User_Notes } from '../models/req';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReqService {
  private reqsUrl = environment.apiUrl + 'reqs/';
  private reqUrl = environment.apiUrl + 'req/';
  private addReqFlagUrl = environment.apiUrl + 'req/addFlag/';
  private removeReqFlagUrl = environment.apiUrl + 'req/unFlag/';
  private addNoteUrl = environment.apiUrl + 'add-note/';

  constructor(
    private http: HttpClient
  ) { }

  getReqs(user: string): Observable<Req[]> {
    return this.http.get<Req[]>(this.reqsUrl + user);
  }

  getReq(req: string): Observable<Req> {
    return this.http.get<Req>(this.reqUrl + req);
  }

  addFlag(req: string): Observable<Req> {
    return this.http.put<Req>(this.addReqFlagUrl + req, {
      ReqInfo: {
        flag: true
      }
    });
  }

  removeFlag(req: string): Observable<Req> {
    return this.http.put<Req>(this.removeReqFlagUrl + req, {
      ReqInfo: {
        flag: false
      }
    });
  }

  addNote(req: string, notes: User_Notes): Observable<User_Notes> {
    return this.http.post<User_Notes>(this.addNoteUrl + req, {
      User: notes.User,
      Date: notes.Date,
      Note_Info: notes.Note_Info
    })
  }
}
