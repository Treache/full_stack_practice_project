import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { debounceTime } from 'rxjs/operators';
import { Subject, from } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  filter$ = new Subject<string>();
  @Input() availableMovies:any;
  @Input() isAdmin:boolean = false;

  constructor(private _movieService: MovieService, private _router: Router) { }
  ngOnInit() {
    if(this.availableMovies == null)
      this.fetchData();
  }
  fetchData() {
    this._movieService.getMovies().subscribe((data) => {
      this.availableMovies = data;
      console.log(this.availableMovies[0])
      console.log(data);
    });
  }
  ngAfterViewInit(){
    this.filter$.pipe(debounceTime(250)).subscribe((filterData) => {
      this._movieService.getMovies(filterData).subscribe((data) => {
        this.availableMovies = data;
        console.log(data);
      });
    })
  }
  update(index) {
    this._router.navigate(['./edit', this.availableMovies[index]._id]);
  }
  delete(index) {
    console.log("Hmm")
    this._movieService.deleteMovie(this.availableMovies[index]._id).subscribe((data) => {
      if(data['error']){
        console.log("ERROR")
      }
      else {
        this.fetchData();
      }
    });
  }
}
