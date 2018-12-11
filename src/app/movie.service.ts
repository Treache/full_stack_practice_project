import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpResponse } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient) { }

  getMovies() {
    return this._http.get('http://localhost:3000/api/movies');
  }
  newMovie(movie) {
    return this._http.post('http://localhost:3000/api/movies',movie);
  }
}
