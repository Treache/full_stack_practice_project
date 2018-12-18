import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient) { }

  getMovies(filter?,status?) {
    return this._http.get('http://localhost:3000/api/movies', {params: this.httpParameterizer(filter, status)});
  }
  getMovie(id) {
    return this._http.get('http://localhost:3000/api/movies/'+id);
  }
  newMovie(movie) {
    return this._http.post('http://localhost:3000/api/movies',movie);
  }
  updateMovie(movie) {
    return this._http.post('http://localhost:3000/api/movies/update',movie);
  }
  deleteMovie(id) {
    return this._http.delete('http://localhost:3000/api/movies/' + id);
  }
  reserve(id) {
    return this._http.get('http://localhost:3000/api/movies/reserve/' + id);
  }
  httpParameterizer(filter, status) {
    let parameters = new HttpParams();
    if(filter)
      parameters = parameters.set("dfilter", filter);
    if(status != null && status != undefined && status != 'undefined')
      parameters = parameters.set("status", status)
    return parameters;
  }
}
