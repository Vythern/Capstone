import { Component } from '@angular/core';
import { Article, ArticleDataService } from '../services/article-data.service';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-articles',
  imports: [NgFor],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  constructor(
    private articleService: ArticleDataService
  ) {}

  articles: Article[] = []

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

}
