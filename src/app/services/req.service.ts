import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Req, User_Notes } from '../models/req';

@Injectable({
  providedIn: 'root'
})
export class ReqService {
  private reqsUrl = 'http://localhost:3000/api/reqs/';
  private reqUrl = 'http://localhost:3000/api/req/';
  private addReqFlagUrl = 'http://localhost:3000/api/req/addFlag/';
  private removeReqFlagUrl = 'http://localhost:3000/api/req/unFlag/';
  private addNoteUrl = 'http://localhost:3000/api/add-note/';

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
