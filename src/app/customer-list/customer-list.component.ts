import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { debounceTime } from 'rxjs/operators';
import { Subject, from } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  
  @Input() customers:any;
  @Input() isAdmin:boolean = false;
  filter$ = new Subject<string>();
  constructor(private _router: Router, private _customerService: CustomerService) { }

  ngOnInit() {
    if(!this.customers)
      this.fetchData()
  }
  fetchData() {
    this._customerService.getCustomers().subscribe((data) => {
      if (data['error'])
        return console.log(data['error'])
      console.log(data)
      this.customers = data;
    })
  }
  ngAfterViewInit(){
    this.filter$.pipe(debounceTime(250)).subscribe((filterData) => {
      this._customerService.getCustomers(filterData).subscribe((data) => {
        this.customers = data;
      })
    })
  }

}
