import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { Router } from "@angular/router";
import { ArticleDataService } from '../services/article-data.service';
import { Article } from '../models/article';

@Component
({
    selector: 'app-add-article',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-article.component.html',
    styleUrl: './add-article.component.css'
})

export class AddArticleComponent implements OnInit
{
    addForm!: FormGroup;
    submitted = false;
    
    articleCodes: number[] = []; //use this to check what codes exist.  


    constructor
    (
        private formBuilder: FormBuilder,
        private router: Router,
        private articleService: ArticleDataService
    ) { }

    ngOnInit(): void
    {
        this.addForm = this.formBuilder.group
        ({
            _id: [],
            code: ['', Validators.required],
            title: ['', Validators.required],
            date: ['', Validators.required],
            image: ['', Validators.required],
            description: ['', Validators.required],
        });
    
        //find lowest available code.  
        this.articleService.getArticles().subscribe((articles: Article[]) =>
        {
            this.articleCodes = articles.map(article => parseInt(article.code, 10)).sort((a, b) => a - b); //parse to integer, sort
            this.setNextAvailableCode();
        });
    }

    private setNextAvailableCode(): void //set to next available code, starting at one.  
    {
        let nextCode = 1;
        for (let i = 0; i < this.articleCodes.length; i++) 
        {
            if (this.articleCodes[i] !== nextCode) { break; }
            nextCode++;
        }
        this.addForm.patchValue({ code: nextCode });
    }

    public onSubmit()
    {
        this.submitted = true;
        if(this.addForm.valid)
        {
            this.articleService.addArticle(this.addForm.value)
            .subscribe
            ( {
                next: (data: any) => 
                {
                    console.log(data);
                    this.router.navigate(['']);
                },
                error: (error: any) =>
                {
                    console.log('Error: ' + error);
            }});
        }
    }

    // get the form short name to access the form fields
    get f() { return this.addForm.controls; }
}
