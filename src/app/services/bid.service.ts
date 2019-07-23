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
  private updateBidUrl = 'http://localhost:3000/api/update-bid/'
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

  updateBid(id: String, bid: Bid): Observable<Bid> {
    return this.http.put<Bid>(this.updateBidUrl + id, {
      Bid_Type: bid.Bid_Type,
      Bid_ID: bid.Bid_ID,
      Proj_Name: bid.Proj_Name
    })
  }

  deleteBid(id: String): Observable<{}> {
    return this.http.delete(this.deleteBidUrl + id);
  }
}
