import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ArticleDataService } from '../services/article-data.service';
import { Article } from '../models/article';

@Component({
    selector: 'app-edit-article',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.css']
})

export class EditArticleComponent implements OnInit {
    public editForm!: FormGroup;
    article!: Article;
    submitted = false;
    message: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private articleDataService: ArticleDataService
    ) { }

    ngOnInit(): void {
        // Retrieve stashed article ID from localStorage
        let articleCode = localStorage.getItem("articleCode");
        if (!articleCode) {
            alert("Something went wrong, couldn't find where I stashed articleCode!");
            this.router.navigate(['']);
            return;
        }

        // Initialize the form with the article's code and other fields
        this.editForm = this.formBuilder.group({
            _id: [],
            code: [articleCode, Validators.required],  // Set the code, but don't allow edits
            title: ['', Validators.required],
            date: ['', Validators.required],
            image: ['', Validators.required],
            description: ['', Validators.required]
        });

        // Fetch the article data based on the code
        this.articleDataService.getArticle(articleCode).subscribe({
            next: (value: any) => {
                this.article = value;
                // Populate the form with the article data
                this.editForm.patchValue(value[0]);
                if (!value) {
                    this.message = 'No Article Retrieved!';
                } else {
                    this.message = 'Article: ' + articleCode + ' retrieved';
                }
                console.log(this.message);
            },
            error: (error: any) => {
                console.log('Error: ' + error);
            }
        });
    }

    public onSubmit() {
        this.submitted = true;
        if (this.editForm.valid) {
            this.articleDataService.updateArticle(this.editForm.value)
                .subscribe({
                    next: (value: any) => {
                        console.log(value);
                        this.router.navigate(['']);
                    },
                    error: (error: any) => {
                        console.log('Error: ' + error);
                    }
                });
        }
    }

    // Get form controls
    get f() { return this.editForm.controls; }
}
