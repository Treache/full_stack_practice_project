import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  constructor(private _movieService: MovieService) { }
  availableMovies;
  ngOnInit() {
    this._movieService.getMovies().subscribe((data) => {
      this.availableMovies = data;
      console.log(data);
    });
    // this.newMovie();
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
