import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bid } from '../models/bid';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private bidsUrl = 'http://localhost:3000/api/bids';
  private addBidUrl = 'http://localhost:3000/api/add-bid';
  private getBidUrl = 'http://localhost:3000/api/bid/';
  private deleteBidUrl = 'http://localhost:3000/api/remove-bid/';

  constructor(
    private http: HttpClient
  ) { }

  getBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(this.bidsUrl);
  }
  addBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(this.addBidUrl, bid);
  }

  getBid(id: String): Observable<Bid> {
    return this.http.get<Bid>(this.getBidUrl + id);
  }

  deleteBid(id: String): Observable<{}> {
    return this.http.delete(this.deleteBidUrl + id);
  }
}
