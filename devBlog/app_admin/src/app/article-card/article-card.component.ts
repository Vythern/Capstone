import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Article } from '../models/article';
import { AuthenticationService } from '../services/authentication.service';

@Component
({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})

export class ArticleCardComponent implements OnInit 
{
  @Input('article') article: any;
  
  constructor
  (
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  
  public isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }
  

  ngOnInit(): void { }

  public editArticle(article: Article) 
  {
    localStorage.removeItem('articleCode');
    localStorage.setItem('articleCode', article.code);
    this.router.navigate(['edit-article']);
  }

  public deleteArticle(article: Article)
  {
    localStorage.removeItem('articleCode');
    localStorage.setItem('articleCode', article.code);
    this.router.navigate(['delete-article']);
  }
}