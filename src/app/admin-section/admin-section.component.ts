import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MovieService} from '../movie.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css'],
})
export class AdminSectionComponent implements OnInit {
  customers;
  newMovieForm : FormGroup;
  newCustomerForm : FormGroup;
  movies;
  movieSuccessMessage : String = "";
  customerSuccessMessage : String = "";
  state : boolean = false; // False => Movies view | True => Customers view
  adminState : boolean = true;
  constructor(private _formBuilder : FormBuilder, private _movieService: MovieService, private _customerService: CustomerService) { }
  ngOnInit() {
    this.newMovieForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      runningTime: new FormControl(0, [Validators.required, Validators.min(10)]),
      director: new FormControl('', [Validators.required, Validators.minLength(3)]),
      genre: new FormControl('', Validators.required),
      status: new FormControl(true)
    })
    this.newCustomerForm = this._formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      address: new FormControl(''),
      city: new FormControl('Toronto', Validators.required),
      phone_number: new FormControl('', Validators.required),
      status: new FormControl(true, Validators.required)
    })
  }
  onSubmit() {
    if(!this.newMovieForm.valid){
      console.log("failed");
      return false;
    }
    this._movieService.newMovie(this.newMovieForm.value).subscribe((data) => {
      this.movies = data;
      if(data) {
        this.movieSuccessMessage = this.newMovieForm.value.title + " has been added."
      }
      this.newMovieForm.reset();
      // console.log(data);
    });
  }
  onRegister(){
    if(!this.newCustomerForm.valid){
      console.log('failed');
      return false
    }
    this._customerService.newCustomer(this.newCustomerForm.value).subscribe((data) => {
      if(data['error'])
        return console.log(data['error']);
      console.log(data);
      this.customers = data;
      this.newCustomerForm.reset();
    })
    // this.
  }
  stateSwitch() {
    console.log("Click")
    this.adminState = !this.adminState;
  }
}