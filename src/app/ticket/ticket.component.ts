import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from '../models/ticket';
import { TicketService } from '../services/ticket.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;

  displayedColumns: string[] = [
    'Ticket Number',
    'Description',
    'Requester',
    'Priority',
    'Date Needed'
  ]

  tickets: Ticket[];
  ticket: Ticket;
  lastTicket: Ticket;
  date = new FormControl(new Date().toUTCString());
  dateNeeded = new FormControl(new Date());
  ticketForm: FormGroup;
  priority = new FormControl(new String(), Validators.required);
  requester = this.authService.initialUser.username.toUpperCase();
  ticketId: number;

  constructor(
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getTickets();
    this.ticketForm = this.formBuilder.group({
      Date_Submitted: this.date,
      Description: ['', Validators.required],
      Requester: this.requester,
      Priority: this.priority,
      Date_Needed: this.dateNeeded
    })

  }



  getTickets() {
    this.ticketService.getTickets().subscribe(
      tickets => {
        this.tickets = tickets;
        this.dataSource = tickets;
        this.iterator();
      }
    )
  }

  onSubmit() {
    this.ticketService.getTickets().subscribe(
      tickets => {
        this.tickets = tickets;
        console.log(this.tickets);
        if(this.tickets.length !== 0) {
          this.lastTicket = this.tickets[this.tickets.length - 1];
          this.ticketId = this.lastTicket.Ticket_ID + 1;
        } else {
          this.ticketId = 0;
        }
        if(this.ticketForm.invalid) {
          return;
        } else {
          this.ticket = new Ticket();
          this.ticket.Date_Submitted = this.ticketForm.controls.Date_Submitted.value;
          this.ticket.Description = this.ticketForm.controls.Description.value;
          this.ticket.Requester = this.ticketForm.controls.Requester.value;
          this.ticket.Priority = this.ticketForm.controls.Priority.value;
          this.ticket.Date_Needed = this.ticketForm.controls.Date_Needed.value;
          this.ticket.Ticket_ID = this.ticketId;

          console.log(this.ticket);

          this.ticketService.addTicket(this.ticket).subscribe(
            ticket => {
              this.ticket = ticket;
              this.tickets.push(this.ticket);
              this.getTickets();
              console.log(this.ticket);
            }
          )
        }
      }
    )
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    console.log(this.dataSource);
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.tickets.slice(start, end);
    this.dataSource = part;
  }
}
