import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { Router } from "@angular/router";
import { ArticleDataService } from '../services/article-data.service';

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
    
    constructor
    (
        private formBuilder: FormBuilder,
        private router: Router,
        private articleService: ArticleDataService
    ) { }

    ngOnInit()
    {
        this.addForm = this.formBuilder.group
        ({
            _id: [],
            code: ['', Validators.required],
            title: ['', Validators.required],
            date: ['', Validators.required],
            image: ['', Validators.required],
            description: ['', Validators.required],
        })
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
