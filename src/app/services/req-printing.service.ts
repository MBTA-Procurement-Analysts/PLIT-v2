import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Req } from '../models/req';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReqPrintingService {
  private allUserReqs = environment + 'req/date/';
  private oneUserReq = environment + 'req/buyer/';

  constructor(
    private http: HttpClient
  ) { }

}
