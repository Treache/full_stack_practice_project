import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../movie.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _movieService: MovieService, private _customerService: CustomerService) { }  
  id;
  movie;
  selectedCustomer = -1;
  customers;
  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
      this.id = data.id;
      // console.log(this.id);
    });
    this._movieService.getMovie(this.id).subscribe((data) => {
      this.movie = data[0];
    })
    this._customerService.getCustomers(null, true).subscribe((data) => {
      if(data['error']) return console.log(data);
      console.log(data);
      this.customers = data;
    })
  }
  submit() {
    this._movieService.reserve(this.movie._id).subscribe((data) => {
      console.log(data)
      if(data['error']) return console.log(data);
      this._router.navigate(['./']);
    })
  }

}
