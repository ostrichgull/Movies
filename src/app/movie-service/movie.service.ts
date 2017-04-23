import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Movie } from '../movie-model/movie.model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MovieService {
     
    constructor (private http: Http) {}
     
    private moviesUrl = 'http://localhost/WebApiMovie/api/movies'; 

    getMovies() : Observable<Movie[]> {         
         return this.http.get(this.moviesUrl)                        
                         .map((res:Response) => res.json())                         
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }     

    getMovie(id: string) : Observable<Movie> {         
         return this.http.get(`${this.moviesUrl}/${id}`)                        
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }  

    addMovie (body: Object): Observable<Movie[]> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.moviesUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }  

    updateMovie (body: Object): Observable<Movie[]> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.moviesUrl}/${body['id']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }  
    
    removeMovie (id:string): Observable<Movie[]> {
        return this.http.delete(`${this.moviesUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));                       
    }  

}