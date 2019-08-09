import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private addTicketUrl = environment.apiUrl + 'addTicket';
  private getTicketsUrl = environment.apiUrl + 'getTickets';

  constructor(
    private http: HttpClient
  ) { }

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.addTicketUrl, ticket);
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.getTicketsUrl);
  }
}
