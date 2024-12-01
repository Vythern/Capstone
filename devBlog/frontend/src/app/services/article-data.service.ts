import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Article =
{
    _id: string,
    code: string,
    title: string,
    date: Date,
    image: string,
    description: string
}
@Injectable({
  providedIn: 'root'
})

export class ArticleDataService 
{
    constructor
    (    
        private http: HttpClient,
    ) {}
        
    baseUrl = 'http://localhost:3000/api';
    url = 'http://localhost:3000/api/articles';
    
    getArticles() : Observable<Article[]> 
    {
        return this.http.get<Article[]>(this.url);
    }
}