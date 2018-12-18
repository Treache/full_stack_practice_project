import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  availableMovies;
  adminLogin;

  constructor(private _formBuilder : FormBuilder, private _movieService: MovieService, private _router: Router) { }
  ngOnInit() {
    this.adminLogin = this._formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }
  logog() {
    console.log("CLICKED")
  }
  onLogin() {
    // console.log("LOGGED");
    if(this.adminLogin.value.email=="admin@admin.ca" && this.adminLogin.value.password == "admin1234") {
      this._router.navigate(['./admin']);
    }
  }
  newMovie() {
    this._movieService.newMovie({
      _id: "5c0e81d598319bbbdc485ce4",
      title: "Superman",
      runningTime: 120,
      genre: "Action",
      rating: 2,
      director: "Me",
      status: true
    }).subscribe((data) => {
      console.log(data);
    })
  }

}
