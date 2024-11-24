import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})

export class ArticleDataService 
{
    constructor
    (    
        private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage
    ) {}
        
    baseUrl = 'http://localhost:3000/api';
    url = 'http://localhost:3000/api/articles';
    
    getArticles() : Observable<Article[]> 
    {
        return this.http.get<Article[]>(this.url);
    }

    addArticle(formData: Article) : Observable<Article>
    {
        return this.http.post<Article>(this.url, formData);
    }

    getArticle(articleCode: string) : Observable<Article[]> 
    {
        return this.http.get<Article[]>(this.url + '/' + articleCode);
    }

    updateArticle(formData: Article) : Observable<Article> 
    {
        return this.http.put<Article>(this.url + '/' + formData.code, formData);
    }

    deleteArticle(articleCode: string): Observable<void> //returns nothing so void observable.  
    {
        return this.http.delete<void>(this.url + '/' + articleCode);
    }

//removed login and register methods, no longer useful.  
}