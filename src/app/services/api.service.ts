import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { Observable } from  'rxjs';
import { API_URL,POSTS_ENDPOINT } from '../constants/api.constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    
    constructor(private http: HttpClient) { }
     httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          })
      };
    postRequest( body: Post) : Observable<Post[]> {;
        return  this.http.post<any>(API_URL+POSTS_ENDPOINT, body)
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(API_URL+POSTS_ENDPOINT)
    }
}