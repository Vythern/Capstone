import { Component } from '@angular/core';
import { Article, ArticleDataService } from '../services/article-data.service';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component
({
  selector: 'app-articles',
  imports: [NgFor, DatePipe], 
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent
{
  constructor(private articleService: ArticleDataService) {}

  articles: Article[] = []

  ngOnInit(): void
  {
    this.articleService.getArticles().subscribe((articles) =>
    {
      this.articles = articles.sort((a, b) => //sort articles by date descending.  
      {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    });
  }
}
