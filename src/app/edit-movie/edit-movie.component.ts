import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  editForm;
  mov;
  id;
  constructor(private _router: Router, private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _movieService: MovieService) { }

  ngOnInit() {
    // this.editForm =  this._formBuilder.group({
    //   title: new FormControl('', Validators.required),
    //   runningTime: new FormControl(0, [Validators.required, Validators.min(10)]),
    //   director: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
    //   genre: new FormControl('', Validators.required),
    //   status: new FormControl(true)
    // })
    this._activatedRoute.params.subscribe((data) => {
      this.id = data.id;
      console.log(this.id);
      
    });
    this._movieService.getMovie(this.id).subscribe((movie) => {
      console.log(movie)
      this.mov = movie[0];
      this.populateForm(movie[0]);
    })
    
  }
  populateForm(movie) {
    this.editForm =  this._formBuilder.group({
      title: new FormControl(movie.title, Validators.required),
      runningTime: new FormControl(movie.runningTime, [Validators.required, Validators.min(10)]),
      director: new FormControl(movie.director, [Validators.required, Validators.minLength(3)]),
      rating: new FormControl(movie.rating, [Validators.required, Validators.min(0), Validators.max(5)]),
      genre: new FormControl(movie.genre, Validators.required),
      status: new FormControl(movie.status)
    })
  }
  onSubmit() {
    let videoDocument = this.editForm.value;
    videoDocument['_id'] = this.mov._id;
    this._movieService.updateMovie(this.editForm.value).subscribe((data) => {
      if (data['error']){
        console.log(data['error'])
      }
      this._router.navigate(['./admin']);
    })
  }
}
