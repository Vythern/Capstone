import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ArticleDataService } from '../services/article-data.service';

@Component({
  selector: 'app-delete-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.css']
})
export class DeleteArticleComponent implements OnInit {
  public deleteForm!: FormGroup;
  articleName: string = '';  // Store the article name for display
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleDataService: ArticleDataService
  ) { }

  ngOnInit(): void {
    // Retrieve stashed article code (ID) from localStorage
    const articleCode = localStorage.getItem("articleCode");
    if (!articleCode) {
      alert("Couldn't find the article code!");
      this.router.navigate(['']);
      return;
    }

    // Initialize the form with the article code and a confirmation question
    this.deleteForm = this.formBuilder.group({
      code: [articleCode, Validators.required],
      name: ['', Validators.required] // We will set this later
    });

    // We can set the articleName here for display in the template
    this.articleDataService.getArticle(articleCode).subscribe({
      next: (value: any) => {
        if (value && value.length > 0) {
          this.articleName = value[0].name; // Extract the article name from the response
          this.deleteForm.patchValue({
            name: this.articleName
          });
        }
      },
      error: (error: any) => {
        console.error('Error retrieving article details:', error);
      }
    });
  }

  // Simplified onSubmit function to delete the article
  public onSubmit(): void {
    this.submitted = true;
    if (this.deleteForm.valid) {
      const articleCode = this.deleteForm.value.code;

      // Call the deleteArticle method to perform the deletion
      this.articleDataService.deleteArticle(articleCode).subscribe({
        next: () => {
          console.log(`Article with code ${articleCode} deleted successfully.`);
          this.router.navigate(['']); // Redirect after deletion
        },
        error: (error) => {
          console.error('Error deleting article:', error);
        }
      });
    }
  }

  // Getter to access form controls
  get f() { return this.deleteForm.controls; }
}
