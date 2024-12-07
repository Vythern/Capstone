import { Component } from '@angular/core';
import { Article, ArticleDataService } from '../services/article-data.service';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component
({
  selector: 'app-articles',
  imports: [NgFor, DatePipe, FormsModule], 
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})

export class ArticlesComponent
{
  constructor(private articleService: ArticleDataService) {}

  articles: Article[] = []
  filteredArticles: Article[] = []; //used to filter articles by name.  
  searchTerm: string = '';

  activePage = 1;
  articlesPerPage = 5;

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
      this.filteredArticles = this.articles;
    });
  }

  refreshSearch(): void //sift through articles and show only ones with search term present.  
  {
    const term = this.searchTerm.toLowerCase();
    this.filteredArticles = this.articles.filter((article) => article.title.toLowerCase().includes(term));
  }

  getArticlesByPage(): Article[] 
  {
    const firstArticle = (this.activePage - 1) * this.articlesPerPage;
    const lastArticle = firstArticle + this.articlesPerPage;
    return this.filteredArticles.slice(firstArticle, lastArticle);
  }

  getNextPage(): void
  { 
    if(this.activePage * this.articlesPerPage < this.filteredArticles.length) { this.activePage++; }
  }

  getPreviousPage(): void 
  { 
    if(this.activePage > 1) { this.activePage--; } 
  }

  getTotalPages(): number 
  { return Math.ceil(this.filteredArticles.length / this.articlesPerPage); }
}
