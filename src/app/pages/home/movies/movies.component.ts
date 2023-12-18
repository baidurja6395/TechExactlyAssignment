import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent  implements OnInit{
  movieList:any
constructor(
  private api :ApiService
){

}
  ngOnInit(): void {
    this.getMovieList()
  }

  async getMovieList(){
    this.api.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US?page=1&api_key=fcc54c057bbb2ec7963d38be9d190f49')
    .then((res:any)=>{
      this.movieList = res.results;
    }).catch((err:any)=>{

    })
  }
}
