import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../article-card/article-card.component';

import { ArticleDataService } from '../services/article-data.service';
import { Article } from '../models/article';

import { AuthenticationService } from '../services/authentication.service';


import { Router } from '@angular/router';

@Component
({
  selector: 'app-article-listing',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './article-listing.component.html',
  styleUrl: './article-listing.component.css',
  providers: [ArticleDataService]
})

export class ArticleListingComponent implements OnInit
{
    articles!:  Article[];
    message: string = '';

    constructor
    (
        private articleDataService: ArticleDataService, 
        private router: Router,
        private authenticationService: AuthenticationService
    ) { console.log('article-listing constructor'); }
    
    public isLoggedIn() { return this.authenticationService.isLoggedIn(); }

    public addArticle(): void
    {
        this.router.navigate(['add-article']);
    }

    private getStuff(): void
    {
        this.articleDataService.getArticles().subscribe(
        {
            next: (value: any) =>
            {
                this.articles = value;
                if(value.length > 0)
                {
                    this.message = value.length + ' Article(s) available.';
                }
                else
                {
                    this.message = 'There were no articles retrieved from the database';
                }
                console.log(this.message);
            },

            error: (error: any) =>
            {
                console.log('Error: ' + error);
            }
        })
    }
          
    ngOnInit(): void
    {
        console.log('ngOnInit');
        this.getStuff();
    }
}